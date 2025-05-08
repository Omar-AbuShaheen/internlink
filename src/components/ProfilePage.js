// src/components/ProfilePage.js
import React, { useState } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

const initialProfile = {
  role: 'Student',
  name: 'Omar Abu Shaheen',
  email: 'Omar@htu.com',
  university: 'HTU',
  skills: 'JavaScript, React, SQL',
  cvLink: 'https://example.com/resume.pdf',
};

function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(initialProfile);

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        <i className="fa fa-user-circle me-2 text-primary"></i> My Profile
      </h2>

      <Card className="shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><strong>Name:</strong></Form.Label>
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <div>{profile.name}</div>
              )}
            </Col>

            <Col md={6}>
              <Form.Label><strong>Role:</strong></Form.Label>
              <div>{profile.role}</div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><strong>Email:</strong></Form.Label>
              {isEditing ? (
                <Form.Control
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              ) : (
                <div>{profile.email}</div>
              )}
            </Col>

            <Col md={6}>
              <Form.Label><strong>University:</strong></Form.Label>
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={tempProfile.university}
                  onChange={(e) => handleChange('university', e.target.value)}
                />
              ) : (
                <div>{profile.university}</div>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label><strong>Skills:</strong></Form.Label>
              {isEditing ? (
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={tempProfile.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                />
              ) : (
                <div>{profile.skills}</div>
              )}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Label><strong>Resume:</strong></Form.Label><br />
              <a href={profile.cvLink} target="_blank" rel="noopener noreferrer">
                View CV
              </a>
            </Col>
          </Row>

          <div className="text-end">
            {isEditing ? (
              <>
                <Button variant="success" className="me-2" onClick={handleSave}>
                  <i className="fa fa-save me-1"></i> Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  <i className="fa fa-times me-1"></i> Cancel
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                <i className="fa fa-pen me-1"></i> Edit Profile
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilePage;
