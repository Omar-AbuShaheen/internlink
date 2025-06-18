import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

function ApplicantsList() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError('');
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/internships/${id}/applicants`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch applicants');
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/internships/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setApplicants(applicants => applicants.map(app => app.id === applicationId ? { ...app, status: updated.status } : app));
    } catch (err) {
      setError('Failed to update status.');
    }
  };



  const handleViewResume = (resumeUrl) => {
    if (resumeUrl) {
      // Open in new tab for viewing
      const fullUrl = `http://localhost:5000${resumeUrl}`;
      window.open(fullUrl, '_blank');
  }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Applicants</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : applicants.length === 0 ? (
        <div>No applicants yet.</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Major</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(applicant => (
              <tr key={applicant.id}>
                <td>{applicant.first_name} {applicant.last_name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.university}</td>
                <td>{applicant.major}</td>
                <td>
                  {applicant.resume_url ? (
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleViewResume(applicant.resume_url)}
                    >
                      <FaEye className="me-1" /> View Resume
                    </Button>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{applicant.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    disabled={applicant.status === 'approved'}
                    onClick={() => handleStatusChange(applicant.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    disabled={applicant.status === 'rejected'}
                    onClick={() => handleStatusChange(applicant.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button as={Link} to="/company/dashboard" variant="outline-primary" className="mt-3">
        Back to Dashboard
      </Button>
    </Container>
  );
}

export default ApplicantsList; 