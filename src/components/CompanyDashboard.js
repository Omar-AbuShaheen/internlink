import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner, Alert, Badge, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaUsers, FaTrash } from 'react-icons/fa';

function CompanyDashboard() {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [stats, setStats] = useState({
    totalInternships: 0,
    totalApplications: 0,
    activeInternships: 0,
    recentApplications: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const token = sessionStorage.getItem('token');
        
        // Fetch internships
        const internshipsRes = await fetch('http://localhost:5000/api/internships/company/internships', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const internshipsData = await internshipsRes.json();
        setInternships(internshipsData);

        // Calculate stats
        const totalInternships = internshipsData.length;
        const activeInternships = internshipsData.filter(i => i.status === 'active').length;
        const totalApplications = internshipsData.reduce((sum, i) => sum + (i.application_count || 0), 0);
        const recentApplications = internshipsData.reduce((sum, i) => sum + (i.recent_applications || 0), 0);

        setStats({
          totalInternships,
          totalApplications,
          activeInternships,
          recentApplications
        });

        setLoading(false);
      } catch (err) {
        setError('Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (internshipId) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) return;
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/internships/${internshipId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete internship');
      setInternships(internships.filter(i => i.id !== internshipId));
    } catch (err) {
      setError('Failed to delete internship.');
    }
  };

  const handleStatusChange = async (internshipId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/internships/${internshipId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setInternships(internships => internships.map(i => i.id === internshipId ? { ...i, status: updated.status } : i));
    } catch (err) {
      setError('Failed to update internship status.');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      closed: 'secondary',
      draft: 'warning'
    };
    return <Badge bg={variants[status] || 'primary'}>{status}</Badge>;
  };

  console.log('Stats:', stats);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {user?.company_name || 'Company'}!</h2>
          <Button as={Link} to="/post-internship" variant="primary" className="mt-2">
            + Post New Internship
          </Button>
        </Col>
      </Row>

      {/* Stats Overview */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total Internships</Card.Title>
              <h3>{stats.totalInternships}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Active Internships</Card.Title>
              <h3>{stats.activeInternships}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total Applications</Card.Title>
              <h3>{stats.totalApplications}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Recent Applications</Card.Title>
              <h3>{stats.recentApplications}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Internships Table */}
      <Row>
        <Col>
          <h4>Your Posted Internships</h4>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : internships.length === 0 ? (
            <div>No internships posted yet.</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {internships.map(internship => {
                  console.log('Internship row:', internship);
                  if (!internship.id) return null;
                  return (
                    <tr key={internship.id}>
                      <td>{internship.title}</td>
                      <td>{internship.type}</td>
                      <td>{internship.location}</td>
                      <td>
                        {/* Status dropdown */}
                        <Form.Select
                          size="sm"
                          value={internship.status || 'active'}
                          onChange={e => handleStatusChange(internship.id, e.target.value)}
                          style={{ width: 120, display: 'inline-block' }}
                        >
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                          <option value="draft">Draft</option>
                        </Form.Select>
                        <div className="mt-1">
                          {getStatusBadge(internship.status)}
                        </div>
                      </td>
                      <td>
                        <Badge bg="info">{internship.application_count || 0}</Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button as={Link} to={`/internships/${internship.id}`} size="sm" variant="info" className="d-flex align-items-center rounded-pill" style={{ minWidth: 40, justifyContent: 'center' }}>
                            <FaEye />
                          </Button>
                          <Button as={Link} to={`/internships/${internship.id}/edit`} size="sm" variant="warning" className="d-flex align-items-center rounded-pill" style={{ minWidth: 40, justifyContent: 'center', color: '#fff', backgroundColor: '#f0ad4e', border: 'none' }}>
                            <FaEdit />
                          </Button>
                          <Button as={Link} to={`/internships/${internship.id}/applicants`} size="sm" variant="primary" className="d-flex align-items-center rounded-pill" style={{ minWidth: 40, justifyContent: 'center' }}>
                            <FaUsers />
                          </Button>
                          <Button size="sm" variant="danger" className="d-flex align-items-center rounded-pill" style={{ minWidth: 40, justifyContent: 'center' }} onClick={() => handleDelete(internship.id)}>
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyDashboard;