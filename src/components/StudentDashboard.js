// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container, ProgressBar, Alert, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaCheckCircle, FaHourglassHalf, FaBookmark, FaBell, FaClipboardList, FaUserEdit, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/StudentDashboard.css';

const mockApplications = [
  { 
    id: 1, 
    title: 'Marketing Intern', 
    company: 'Creative Co.', 
    status: 'Under Review', 
    date: '2024-06-01',
    logo: require('../images/marketing-logo.png'),
    interviewDate: '2024-06-15',
    interviewTime: '10:00 AM',
    interviewType: 'Virtual'
  },
  { 
    id: 2, 
    title: 'Software Engineer Intern', 
    company: 'Techify', 
    status: 'Accepted', 
    date: '2024-05-20',
    logo: require('../images/tech-logo.png'),
    startDate: '2024-07-01',
    salary: '$25/hour'
  },
];

const mockRecommendations = [
  { 
    id: 101, 
    title: 'UX Designer Intern', 
    company: 'DesignPro',
    logo: require('../images/design-logo.png'),
    location: 'San Francisco, CA',
    type: 'Hybrid'
  },
  { 
    id: 102, 
    title: 'Finance Intern', 
    company: 'MoneyMate',
    logo: require('../images/logo.png'),
    location: 'New York, NY',
    type: 'On-site'
  },
];

const mockSaved = [
  { 
    id: 201, 
    title: 'Data Analyst Intern', 
    company: 'DataCorp',
    logo: require('../images/tech-logo.png'),
    location: 'Remote',
    type: 'Remote'
  },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [saved, setSaved] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profileProgress, setProfileProgress] = useState(0);

  // Example stats
  const stats = [
    { label: 'Applications', value: applications.length, icon: <FaClipboardList />, color: 'primary' },
    { label: 'Interviews', value: applications.filter(app => app.status === 'Under Review').length, icon: <FaHourglassHalf />, color: 'info' },
    { label: 'Offers', value: applications.filter(app => app.status === 'Accepted').length, icon: <FaCheckCircle />, color: 'success' },
    { label: 'Saved', value: saved.length, icon: <FaBookmark />, color: 'warning' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API calls
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000)),
          new Promise(resolve => setTimeout(resolve, 1200)),
          new Promise(resolve => setTimeout(resolve, 800))
        ]);
        
        setApplications(mockApplications);
        setRecommendations(mockRecommendations);
        setSaved(mockSaved);
        setProfileProgress(80);
        setNotifications([
          { 
            id: 1, 
            message: 'You have an interview scheduled for Software Engineer Intern!', 
            type: 'info',
            date: '2024-06-14'
          },
          { 
            id: 2, 
            message: 'Your application for Marketing Intern is under review.', 
            type: 'primary',
            date: '2024-06-13'
          },
        ]);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewDetails = (internshipId) => {
    navigate(`/internships/${internshipId}`);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (isLoading) {
    return (
      <Container className="student-dashboard py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading your dashboard...</p>
      </Container>
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
      <div className="d-flex align-items-center mb-3">
        <img
          src="https://ui-avatars.com/api/?name=Omar&background=0d6efd&color=fff&rounded=true&size=48"
          alt="User Avatar"
          width={48}
          height={48}
          className="me-3 border border-primary bg-white rounded-circle shadow-sm"
        />
        <h2 className="mb-0">👋 Welcome back, <span className="text-primary">Omar</span>!</h2>
      </div>

      {/* Welcome Message */}
      <Alert variant="primary" className="d-flex align-items-center mb-4" style={{ background: 'linear-gradient(90deg, #e3f2fd 60%, #fff 100%)', border: 'none', fontSize: '1.1rem' }}>
        <i className="fa-solid fa-hand-sparkles me-3 fa-lg text-primary"></i>
        <div>
          <strong>Welcome to your dashboard!</strong> Here you can track your applications, discover new opportunities, and manage your profile. Let's make your internship journey a success!
        </div>
      </Alert>

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        {stats.map((stat, i) => (
          <Col md={3} sm={6} xs={12} key={i}>
            <Card className={`stat-card border-${stat.color} text-center shadow-sm`}>
              <Card.Body>
                <div className={`stat-icon text-${stat.color} mb-2`}>{stat.icon}</div>
                <h3 className={`text-${stat.color}`}>{stat.value}</h3>
                <div className="stat-label small text-muted">{stat.label}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Profile Progress */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <FaUserEdit className="me-2 text-primary" />
              <strong>Profile Completion</strong>
            </div>
            <span className="text-primary fw-bold">{profileProgress}%</span>
          </div>
          <ProgressBar now={profileProgress} label={`${profileProgress}%`} className="mt-2" />
          {profileProgress < 100 && (
            <Button 
              variant="link" 
              className="mt-2 p-0 text-decoration-none"
              onClick={handleEditProfile}
            >
              Complete your profile to increase your chances
            </Button>
          )}
        </Card.Body>
      </Card>

      {/* Notifications */}
      {notifications.map((note) => (
        <Alert key={note.id} variant={note.type} className="d-flex align-items-center justify-content-between">
          <div>
            <FaBell className="me-2" /> {note.message}
          </div>
          <small className="text-muted">{note.date}</small>
        </Alert>
      ))}

      {/* My Applications */}
      <h4 className="mb-3 mt-5">📄 My Applications</h4>
      <Row className="mb-5">
        {applications.map((app) => (
          <Col key={app.id} md={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={app.logo} 
                    alt={app.company} 
                    width={40} 
                    height={40} 
                    className="rounded-circle border me-3" 
                  />
                  <div>
                    <Card.Title className="mb-0" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{app.title}</Card.Title>
                    <div className="text-muted small mt-1" style={{ lineHeight: 1.2 }}>{app.company}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <Badge bg={app.status === 'Accepted' ? 'success' : app.status === 'Under Review' ? 'info' : 'secondary'}>
                    {app.status}
                  </Badge>
                  <span className="ms-3 text-muted small">Applied on {app.date}</span>
                </div>
                {app.status === 'Under Review' && app.interviewDate && (
                  <Alert variant="info" className="mb-3">
                    <strong>Interview Scheduled:</strong><br />
                    Date: {app.interviewDate}<br />
                    Time: {app.interviewTime}<br />
                    Type: {app.interviewType}
                  </Alert>
                )}
                {app.status === 'Accepted' && (
                  <Alert variant="success" className="mb-3">
                    <strong>Congratulations! 🎉</strong><br />
                    Start Date: {app.startDate}<br />
                    Salary: {app.salary}
                  </Alert>
                )}
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => handleViewDetails(app.id)}
                >
                  View Details <FaExternalLinkAlt className="ms-1" size={12} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Saved Internships */}
      <h4 className="mb-3">🔖 Saved Internships</h4>
      <Row className="mb-5">
        {saved.length === 0 ? (
          <Col className="text-muted">No saved internships yet.</Col>
        ) : (
          saved.map((item) => (
            <Col key={item.id} md={6} className="mb-3">
              <Card className="h-100 border-warning shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={item.logo} 
                      alt={item.company} 
                      width={40} 
                      height={40} 
                      className="rounded-circle border me-3" 
                    />
                    <div>
                      <Card.Title className="mb-0" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{item.title}</Card.Title>
                      <div className="text-muted small mt-1" style={{ lineHeight: 1.2 }}>{item.company}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Badge bg="light" text="dark" className="me-2">
                      <FaMapMarkerAlt className="me-1" size={12} />
                      {item.location}
                    </Badge>
                    <Badge bg="secondary">{item.type}</Badge>
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleViewDetails(item.id)}
                  >
                    View Details <FaExternalLinkAlt className="ms-1" size={12} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Recommended Internships */}
      <h4 className="mb-3">🎯 Recommended Internships</h4>
      <Row>
        {recommendations.map((internship) => (
          <Col key={internship.id} md={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={internship.logo} 
                    alt={internship.company} 
                    width={40} 
                    height={40} 
                    className="rounded-circle border me-3" 
                  />
                  <div>
                    <Card.Title className="mb-0" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{internship.title}</Card.Title>
                    <div className="text-muted small mt-1" style={{ lineHeight: 1.2 }}>{internship.company}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-2">
                    <FaMapMarkerAlt className="me-1" size={12} />
                    {internship.location}
                  </Badge>
                  <Badge bg="secondary">{internship.type}</Badge>
                </div>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleViewDetails(internship.id)}
                >
                  View Details <FaExternalLinkAlt className="ms-1" size={12} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Profile */}
      <div className="text-center mt-5">
        <Button 
          variant="outline-dark"
          onClick={handleEditProfile}
        >
          <i className="fa-solid fa-user-pen me-2"></i> Edit My Profile
        </Button>
      </div>
    </Container>
  );
}

export default StudentDashboard;
