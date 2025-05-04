import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

// Reuse the same mock data (later replace with API call)
const mockInternships = [
  { id: 1, title: 'Marketing Intern', company: 'Top Agency', description: 'Help with marketing campaigns and grow your skills.' },
  { id: 2, title: 'Software Engineer Intern', company: 'Tech Startup', description: 'Join a fast-paced tech team and build awesome products.' },
  { id: 3, title: 'Design Intern', company: 'Creative Studio', description: 'Collaborate on creative projects for global brands.' },
  { id: 4, title: 'Finance Intern', company: 'Finance Firm', description: 'Support financial analysis and reporting tasks.' },
];

function InternshipDetail() {
  const { id } = useParams();
  const internship = mockInternships.find((item) => item.id === parseInt(id));

  if (!internship) {
    return (
      <Container className="mt-5">
        <h2>Internship Not Found</h2>
        <Button as={Link} to="/internships" variant="primary">
          Back to Listings
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{internship.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{internship.company}</Card.Subtitle>
          <Card.Text>{internship.description}</Card.Text>
          <Button variant="success" className="me-2">
            Apply Now
          </Button>
          <Button as={Link} to="/internships" variant="outline-primary">
            Back to Listings
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InternshipDetail;
