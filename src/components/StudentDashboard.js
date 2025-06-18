// src/components/StudentDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Container, Alert, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaClipboardList, 
  FaExternalLinkAlt, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBuilding,
  FaTimesCircle,
  FaChartLine
} from 'react-icons/fa';
import '../styles/StudentDashboard.css';
import { AuthContext } from '../context/AuthContext';

function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [quote, setQuote] = useState(null);

  // Calculate application statistics
  const applicationStats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    underReview: applications.filter(app => app.status === 'Under Review').length,
    accepted: applications.filter(app => app.status === 'Accepted' || app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'Rejected' || app.status === 'rejected').length,
  };

  // Stats cards data
  const stats = [
    { 
      label: 'Total Applications', 
      value: applicationStats.total, 
      icon: <FaClipboardList />, 
      color: 'primary',
      subtext: `${applicationStats.pending} pending`
    },
    { 
      label: 'Under Review', 
      value: applicationStats.underReview, 
      icon: <FaHourglassHalf />, 
      color: 'info',
      subtext: 'Applications being reviewed'
    },
    { 
      label: 'Accepted', 
      value: applicationStats.accepted, 
      icon: <FaCheckCircle />, 
      color: 'success',
      subtext: 'Successful applications'
    },
    { 
      label: 'Rejected', 
      value: applicationStats.rejected, 
      icon: <FaTimesCircle />, 
      color: 'danger',
      subtext: 'Unsuccessful applications'
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/internships/student/applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch applications');
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.quotable.io/random?tags=success,motivation');
        const data = await res.json();
        setQuote(data);
      } catch (err) {
        setQuote(null);
      }
    };

    fetchDashboardData();
    fetchQuote();
  }, []);

  const handleViewDetails = (internshipId) => {
    navigate(`/internships/${internshipId}`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'pending': 'warning',
      'Under Review': 'info',
      'Accepted': 'success',
      'approved': 'success',
      'Rejected': 'danger',
      'rejected': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'} className="status-badge">{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="mt-3 text-muted">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="student-dashboard py-5">
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-3">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="student-dashboard py-4">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="avatar-container">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.first_name || 'User'}&background=ffffff&color=3b82f6&rounded=true&size=64`}
            alt="User Avatar"
            className="avatar"
          />
          <div>
            <h2>Welcome back, {user?.first_name || 'Student'}!</h2>
            <p>Track your internship applications and career progress</p>
          </div>
        </div>
      </div>

      {/* Quote Card */}
      {quote && (
        <div className="quote-card">
          <p>"{quote.content}"</p>
          <span className="quote-author">- {quote.author}</span>
        </div>
      )}

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        {stats.map((stat, i) => (
          <Col md={3} sm={6} xs={12} key={i}>
            <Card className={`stat-card border-${stat.color} text-center shadow-sm h-100`}>
              <Card.Body>
                <div className={`stat-icon text-${stat.color}`}>{stat.icon}</div>
                <h3 className={`text-${stat.color}`}>{stat.value}</h3>
                <div className="stat-label small text-muted">{stat.label}</div>
                {stat.subtext && (
                  <div className="stat-subtext small text-muted mt-1">{stat.subtext}</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Applications Table */}
      <Card className="applications-card mb-4">
        <Card.Header>
          <h4><FaChartLine className="me-2" />Application Progress</h4>
        </Card.Header>
        <Card.Body className="p-0">
          {applications.length === 0 ? (
            <div className="empty-state">
              <FaClipboardList className="empty-state-icon" />
              <h5>No Applications Yet</h5>
              <p>Start applying to internships to track your progress here.</p>
              <Button as={Link} to="/internships" variant="primary" className="action-button">
                Browse Internships
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Location</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaBuilding className="me-2 text-muted" />
                          {application.company_name}
                        </div>
                      </td>
                      <td>{application.position}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaMapMarkerAlt className="me-2 text-muted" />
                          {application.location}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt className="me-2 text-muted" />
                          {new Date(application.applied_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td>{getStatusBadge(application.status)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="action-button"
                          onClick={() => handleViewDetails(application.internship_id)}
                        >
                          <FaExternalLinkAlt className="me-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentDashboard;
