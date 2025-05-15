// src/components/StudentDashboard.js
import React from 'react';
import { Card, Button, Row, Col, Container, ProgressBar, Alert, Badge } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaCheckCircle, FaHourglassHalf, FaBookmark, FaBell, FaClipboardList, FaUserEdit } from 'react-icons/fa';
import '../styles/StudentDashboard.css';

const mockApplications = [
  { id: 1, title: 'Marketing Intern', company: 'Creative Co.', status: 'Under Review', date: '2024-06-01' },
  { id: 2, title: 'Software Engineer Intern', company: 'Techify', status: 'Accepted', date: '2024-05-20' },
];

const mockRecommendations = [
  { id: 101, title: 'UX Designer Intern', company: 'DesignPro' },
  { id: 102, title: 'Finance Intern', company: 'MoneyMate' },
];

const mockSaved = [
  { id: 201, title: 'Data Analyst Intern', company: 'DataCorp' },
];

function StudentDashboard() {
  // Example stats
  const stats = [
    { label: 'Applications', value: 5, icon: <FaClipboardList />, color: 'primary' },
    { label: 'Interviews', value: 1, icon: <FaHourglassHalf />, color: 'info' },
    { label: 'Offers', value: 1, icon: <FaCheckCircle />, color: 'success' },
    { label: 'Saved', value: 3, icon: <FaBookmark />, color: 'warning' },
  ];
  const profileProgress = 80;
  const notifications = [
    { id: 1, message: 'You have an interview scheduled for Software Engineer Intern!', type: 'info' },
    { id: 2, message: 'Your application for Marketing Intern is under review.', type: 'primary' },
  ];

  return (
    <Container className="student-dashboard py-4">
      <h2 className="mb-4">👋 Welcome back, Student!</h2>

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
        </Card.Body>
      </Card>

      {/* Notifications */}
      {notifications.map((note) => (
        <Alert key={note.id} variant={note.type} className="d-flex align-items-center">
          <FaBell className="me-2" /> {note.message}
        </Alert>
      ))}

      {/* My Applications */}
      <h4 className="mb-3 mt-5">📄 My Applications</h4>
      <Row className="mb-5">
        {mockApplications.map((app) => (
          <Col key={app.id} md={6} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{app.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{app.company}</Card.Subtitle>
                <Card.Text>
                  Status: <Badge bg={app.status === 'Accepted' ? 'success' : app.status === 'Under Review' ? 'info' : 'secondary'}>{app.status}</Badge>
                  <span className="ms-3 text-muted small">{app.date}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Saved Internships */}
      <h4 className="mb-3">🔖 Saved Internships</h4>
      <Row className="mb-5">
        {mockSaved.length === 0 ? (
          <Col className="text-muted">No saved internships yet.</Col>
        ) : (
          mockSaved.map((item) => (
            <Col key={item.id} md={6} className="mb-3">
              <Card className="h-100 border-warning">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.company}</Card.Subtitle>
                  <Button variant="primary" size="sm">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Recommended Internships */}
      <h4 className="mb-3">🎯 Recommended Internships</h4>
      <Row>
        {mockRecommendations.map((internship) => (
          <Col key={internship.id} md={6} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{internship.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{internship.company}</Card.Subtitle>
                <Button variant="primary" size="sm">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Profile */}
      <div className="text-center mt-5">
        <Button variant="outline-dark">
          <i className="fa-solid fa-user-pen me-2"></i> Edit My Profile
        </Button>
      </div>
    </Container>
  );
}

export default StudentDashboard;
