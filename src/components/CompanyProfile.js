import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const initialState = {
  company_name: '',
  industry: '',
  website: '',
  location: '',
  company_size: '',
  company_logo_url: '',
  about: '',
};

function CompanyProfile() {
  const [profile, setProfile] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        if (!token) {
          setErrorMsg('You are not logged in. Please log in as a company.');
          setLoading(false);
          return;
        }
        const res = await fetch('http://localhost:5000/api/internships/company/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 401 || res.status === 403) {
          setErrorMsg('Unauthorized. Please log in as a company.');
          setLoading(false);
          return;
        }
        if (res.status === 404) {
          setErrorMsg('Company profile not found. Please complete your registration.');
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile({
          company_name: data.company_name || '',
          industry: data.industry || '',
          website: data.website || '',
          location: data.location || '',
          company_size: data.company_size || '',
          company_logo_url: data.company_logo_url || '',
          about: data.about || '',
        });
      } catch (err) {
        setErrorMsg('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/internships/company/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      setSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setErrorMsg('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3 text-muted">Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow-lg p-4">
            <h3 className="mb-4 text-primary">Company Profile</h3>
            {success && (
              <Alert variant="success">Profile updated successfully!</Alert>
            )}
            {errorMsg && (
              <Alert variant="danger">{errorMsg}</Alert>
            )}
            {!isEditing ? (
              <div>
                <Row>
                  <Col md={6}><strong>Company Name:</strong> {profile.company_name}</Col>
                  <Col md={6}><strong>Industry:</strong> {profile.industry}</Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}><strong>Website:</strong> {profile.website ? <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a> : 'N/A'}</Col>
                  <Col md={6}><strong>Location:</strong> {profile.location}</Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}><strong>Company Size:</strong> {profile.company_size}</Col>
                  <Col md={6}><strong>Logo:</strong> {profile.company_logo_url ? <a href={profile.company_logo_url} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</Col>
                </Row>
                <Row className="mt-2">
                  <Col><strong>About:</strong> {profile.about}</Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="companyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="company_name"
                        value={profile.company_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="industry">
                      <Form.Label>Industry</Form.Label>
                      <Form.Control
                        type="text"
                        name="industry"
                        value={profile.industry}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="website">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        type="text"
                        name="website"
                        value={profile.website}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="location">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="companySize">
                      <Form.Label>Company Size</Form.Label>
                      <Form.Control
                        type="text"
                        name="company_size"
                        value={profile.company_size}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="companyLogoUrl">
                      <Form.Label>Company Logo URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="company_logo_url"
                        value={profile.company_logo_url}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="about">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="about"
                    value={profile.about}
                    onChange={handleChange}
                    rows={3}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="secondary" className="me-2" onClick={() => setIsEditing(false)} disabled={isSubmitting}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyProfile; 