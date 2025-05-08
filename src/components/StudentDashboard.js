// src/components/StudentDashboard.js
import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

const mockApplications = [
  { id: 1, title: 'Marketing Intern', company: 'Creative Co.', status: 'Under Review' },
  { id: 2, title: 'Software Engineer Intern', company: 'Techify', status: 'Accepted' },
];

const mockRecommendations = [
  { id: 101, title: 'UX Designer Intern', company: 'DesignPro' },
  { id: 102, title: 'Finance Intern', company: 'MoneyMate' },
];

function StudentDashboard() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">👋 Welcome back, Student!</h2>

      {/* My Applications */}
      <h4 className="mb-3">📄 My Applications</h4>
      <Row className="mb-5">
        {mockApplications.map((app) => (
          <Col key={app.id} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{app.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{app.company}</Card.Subtitle>
                <Card.Text>Status: <strong>{app.status}</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recommended Internships */}
      <h4 className="mb-3">🎯 Recommended Internships</h4>
      <Row>
        {mockRecommendations.map((internship) => (
          <Col key={internship.id} md={6} className="mb-3">
            <Card>
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
