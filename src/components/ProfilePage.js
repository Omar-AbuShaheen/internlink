import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Nav,
  Button,
  Image,
  Form,
} from 'react-bootstrap';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    userId: 'omar123',
    name: 'Omar Abu Shaheen',
    email: 'Omar@htu.com',
    phone: '078 8888888',
    profession: 'Student - Web Developer',
    skills: ['React', 'JavaScript', 'SQL'],
    workLinks: [
      { label: 'GitHub', url: 'https://github.com/Omar-AbuShaheen' },
      { label: 'Portfolio', url: 'https://www.omarabushaheen.com' },
    ],
    profileImage:
      'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
  });

  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState(profile);

  const handleChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleSave = () => {
    setProfile(formState);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormState(profile);
    setEditMode(false);
  };

  return (
    <Container className="py-4">
      <Card className="shadow p-3">
        <Row>
          {/* Left column */}
          <Col md={4} className="text-center border-end">
            <Image
              src={profile.profileImage}
              roundedCircle
              width="120"
              height="120"
              className="mb-2"
            />
            <div className="mb-3">
              <Button variant="outline-secondary" size="sm">
                Change Photo
              </Button>
            </div>
            <h5 className="text-muted">WORK LINK</h5>
            <ul className="list-unstyled mb-4">
              {profile.workLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h5 className="text-muted">SKILLS</h5>
            <ul className="list-unstyled">
              {profile.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </Col>

          {/* Right column */}
          <Col md={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3>{profile.name}</h3>
                <p className="text-primary">{profile.profession}</p>
              </div>
              {editMode ? (
                <>
                  <Button variant="success" size="sm" onClick={handleSave} className="me-2">
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <Tab.Container defaultActiveKey="about">
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="timeline">Timeline</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="about">
                  <Row className="mb-2">
                    <Col sm={4}><strong>User ID:</strong></Col>
                    <Col sm={8}>
                      {editMode ? (
                        <Form.Control
                          type="text"
                          value={formState.userId}
                          onChange={(e) => handleChange('userId', e.target.value)}
                        />
                      ) : (
                        profile.userId
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Name:</strong></Col>
                    <Col sm={8}>
                      {editMode ? (
                        <Form.Control
                          type="text"
                          value={formState.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                      ) : (
                        profile.name
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Email:</strong></Col>
                    <Col sm={8}>
                      {editMode ? (
                        <Form.Control
                          type="email"
                          value={formState.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      ) : (
                        profile.email
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Phone:</strong></Col>
                    <Col sm={8}>
                      {editMode ? (
                        <Form.Control
                          type="text"
                          value={formState.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      ) : (
                        profile.phone
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Profession:</strong></Col>
                    <Col sm={8}>
                      {editMode ? (
                        <Form.Control
                          type="text"
                          value={formState.profession}
                          onChange={(e) => handleChange('profession', e.target.value)}
                        />
                      ) : (
                        profile.profession
                      )}
                    </Col>
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey="timeline">
                  <p>📌 Timeline content or activity history will go here.</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProfilePage;
