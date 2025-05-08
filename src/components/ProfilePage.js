
import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

const mockProfile = {
  role: 'Student',
  name: 'Omar Abu Shaheen',
  email: 'Omar@htu.com',
  university: 'HTU',
  skills: ['JavaScript', 'React', 'SQL'],
  cvLink: 'https://example.com/resume.pdf',
};

function ProfilePage() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">👤 My Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>{mockProfile.name}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">{mockProfile.role}</Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Email:</strong> {mockProfile.email}</ListGroup.Item>
            <ListGroup.Item><strong>University:</strong> {mockProfile.university}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Skills:</strong> {mockProfile.skills.join(', ')}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Resume:</strong>{' '}
              <a href={mockProfile.cvLink} target="_blank" rel="noopener noreferrer">
                View CV
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilePage;
