import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mockInternships = [
  {
    id: 1,
    title: 'Marketing Intern',
    company: 'Top Agency',
    description: 'Help with marketing campaigns and grow your skills.',
  },
  {
    id: 2,
    title: 'Software Engineer Intern',
    company: 'Tech Startup',
    description: 'Join a fast-paced tech team and build awesome products.',
  },
  {
    id: 3,
    title: 'Design Intern',
    company: 'Creative Studio',
    description: 'Collaborate on creative projects for global brands.',
  },
  {
    id: 4,
    title: 'Finance Intern',
    company: 'Finance Firm',
    description: 'Support financial analysis and reporting tasks.',
  },
];

function InternshipList() {
  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4 text-center">All Internship Opportunities</h2>
      <Row>
        {mockInternships.map((internship) => (
          <Col md={4} className="mb-4" key={internship.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{internship.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{internship.company}</Card.Subtitle>
                <Card.Text>{internship.description}</Card.Text>
                <Button
                  as={Link}
                  to={`/internships/${internship.id}`}
                  variant="primary"
                  size="sm"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default InternshipList;
