import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Badge, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import '../styles/InternshipDetail.css';
import { AuthContext } from '../context/AuthContext';

function InternshipDetail() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyStatus, setApplyStatus] = useState('idle');
  const [applyMsg, setApplyMsg] = useState('');
  const [yesNoResult, setYesNoResult] = useState(null);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/api/internships/${id}`);
        if (!response.ok) {
          const errorBody = await response.json();
          throw new Error(errorBody.message || 'Failed to fetch internship');
        }
        const data = await response.json();
        setInternship(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  useEffect(() => {
    if (role === 'student' && internship) {
      const token = sessionStorage.getItem('token');
      fetch(`http://localhost:5000/api/internships/student/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(apps => {
          if (Array.isArray(apps) && apps.some(app => app.internship_id === Number(id))) {
            setApplyStatus('applied');
            setApplyMsg('You have already applied to this internship.');
          }
        });
    }
  }, [role, internship, id]);

  const handleApply = async () => {
    setApplyStatus('loading');
    setApplyMsg('');
    setYesNoResult(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/internships/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({})
      });
      if (!res.ok) {
        const errBody = await res.json();
        setApplyStatus('error');
        setApplyMsg(errBody.message || 'Failed to apply.');
        return;
      }
      setApplyStatus('success');
      setApplyMsg('Application submitted successfully!');
      // Fetch Yes No API result
      const yesNoRes = await fetch('https://yesno.wtf/api');
      const yesNoData = await yesNoRes.json();
      setYesNoResult(yesNoData);
    } catch (err) {
      setApplyStatus('error');
      setApplyMsg('Failed to apply. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Container className="internship-detail-container py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading internship details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="internship-detail-container py-5">
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-3">
            <Button as={Link} to="/internships" variant="primary">
              Back to Listings
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!internship) return null;

  return (
    <Container className="internship-detail-container py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="internship-detail-card shadow-lg">
            <div className="internship-detail-header d-flex align-items-center gap-3 p-4 border-bottom">
              <div>
                <h3 className="mb-1">{internship.title}</h3>
                <span className="text-muted">
                  <FaBuilding className="me-1" />
                  {internship.company_name}
                </span>
              </div>
            </div>
            <Card.Body className="p-4">
              <div className="mb-4">
                <Badge bg="info" className="me-2">
                  {internship.type}
                </Badge>
                <span className="text-muted ms-2">
                  <FaMapMarkerAlt className="me-1" />
                  {internship.location}
                </span>
              </div>
              <h5>Description</h5>
              <p>{internship.description}</p>
              {internship.requirements && (
                <>
                  <h5>Requirements</h5>
                  <p>{internship.requirements}</p>
                </>
              )}
              {internship.duration && (
                <>
                  <h5>Duration</h5>
                  <p>{internship.duration}</p>
                </>
              )}
              {internship.deadline && (
                <>
                  <h5>Deadline</h5>
                  <p>{new Date(internship.deadline).toLocaleDateString()}</p>
                </>
              )}
              <div className="d-flex justify-content-end mt-4">
                <Button 
                  as={Link} 
                  to={role === 'company' ? '/company/dashboard' : role === 'student' ? '/student/dashboard' : '/internships'} 
                  variant="outline-primary" 
                  className="me-2"
                >
                  Back to Dashboard
                </Button>
                {role === 'student' && (
                  <Button
                    variant="success"
                    disabled={applyStatus === 'applied' || applyStatus === 'success' || applyStatus === 'loading'}
                    onClick={handleApply}
                  >
                    {applyStatus === 'loading' ? 'Applying...' : applyStatus === 'applied' || applyStatus === 'success' ? 'Applied' : 'Apply'}
                  </Button>
                )}
              </div>
              {applyMsg && (
                <Alert variant={applyStatus === 'success' ? 'success' : 'danger'} className="mt-3">
                  {applyMsg}
                  {applyStatus === 'success' && yesNoResult && (
                    <div className="mt-3 text-center">
                      <h5>Magic 8-Ball says: {yesNoResult.answer.toUpperCase()}</h5>
                      <img src={yesNoResult.image} alt={yesNoResult.answer} style={{ maxWidth: '200px' }} />
                    </div>
                  )}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InternshipDetail;
