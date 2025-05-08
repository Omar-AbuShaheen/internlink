
import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const mockListings = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    description: 'Looking for a React intern to join our UI team.',
    deadline: '2025-06-30',
  },
  {
    id: 2,
    title: 'Business Analyst Intern',
    description: 'Assist with client and market research.',
    deadline: '2025-07-10',
  },
];

function CompanyDashboard() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">🏢 Welcome to your Company Dashboard!</h2>

      <div className="text-end mb-4">
        <Button variant="primary">+ Post New Internship</Button>
      </div>

      <h4 className="mb-3">📋 My Internship Listings</h4>
      <Row>
        {mockListings.map((item) => (
          <Col md={6} key={item.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="text-muted">Deadline: {item.deadline}</Card.Text>
                <Button variant="outline-secondary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CompanyDashboard;
