import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const initialState = {
  first_name: '',
  last_name: '',
  phone: '',
  university: '',
  major: '',
  graduation_year: '',
  resume_url: '',
  profile_picture_url: '',
  bio: '',
};

function StudentProfile() {
  const [profile, setProfile] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        if (!token) {
          setErrorMsg('You are not logged in. Please log in as a student.');
          setLoading(false);
          return;
        }
        const res = await fetch('http://localhost:5000/api/internships/student/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 401 || res.status === 403) {
          setErrorMsg('Unauthorized. Please log in as a student.');
          setLoading(false);
          return;
        }
        if (res.status === 404) {
          setErrorMsg('Student profile not found. Please complete your registration.');
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          university: data.university || '',
          major: data.major || '',
          graduation_year: data.graduation_year || '',
          resume_url: data.resume_url || '',
          profile_picture_url: data.profile_picture_url || '',
          bio: data.bio || '',
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
      const response = await fetch('http://localhost:5000/api/internships/student/profile', {
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

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadError('');
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setUploading(true);
    setUploadError('');
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();
      formData.append('resume', resumeFile);
      const res = await fetch('http://localhost:5000/api/auth/upload-resume', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload resume');
      const data = await res.json();
      setProfile((prev) => ({ ...prev, resume_url: data.url }));
      setResumeFile(null);
    } catch (err) {
      setUploadError('Failed to upload resume.');
    } finally {
      setUploading(false);
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
            <h3 className="mb-4 text-primary">My Profile</h3>
            {success && (
              <Alert variant="success">Profile updated successfully!</Alert>
            )}
            {errorMsg && (
              <Alert variant="danger">{errorMsg}</Alert>
            )}
            {!isEditing ? (
              <div>
                <Row>
                  <Col md={6}><strong>First Name:</strong> {profile.first_name}</Col>
                  <Col md={6}><strong>Last Name:</strong> {profile.last_name}</Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}><strong>Phone:</strong> {profile.phone}</Col>
                  <Col md={6}><strong>University:</strong> {profile.university}</Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}><strong>Major:</strong> {profile.major}</Col>
                  <Col md={6}><strong>Graduation Year:</strong> {profile.graduation_year}</Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Card className="bg-light border-primary">
                      <Card.Body>
                        <h5 className="text-primary mb-3">📄 Resume/CV</h5>
                        <Row>
                          <Col md={6}>
                            <strong>Current Resume:</strong> 
                            {profile.resume_url ? (
                              <div className="mt-2">
                                <Button 
                                  variant="outline-success" 
                                  size="sm" 
                                  href={profile.resume_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  📄 View My Resume
                                </Button>
                              </div>
                            ) : (
                              <div className="text-muted mt-2">No resume uploaded yet</div>
                            )}
                          </Col>
                  <Col md={6}>
                    <Form.Group controlId="resumeUpload">
                              <Form.Label><strong>Upload New Resume:</strong></Form.Label>
                              <Form.Control 
                                type="file" 
                                accept=".pdf,.doc,.docx" 
                                onChange={handleResumeChange} 
                                disabled={uploading}
                                className="mb-2"
                              />
                              <div className="small text-muted mb-2">Accepted: PDF, DOC, DOCX</div>
                      <Button
                        variant="primary"
                                size="sm"
                        onClick={handleResumeUpload}
                        disabled={!resumeFile || uploading}
                      >
                                {uploading ? '⏳ Uploading...' : '⬆️ Upload Resume'}
                      </Button>
                              {uploadError && <div className="text-danger mt-2 small">{uploadError}</div>}
                              {!uploadError && resumeFile && (
                                <div className="text-success mt-2 small">✅ Ready to upload: {resumeFile.name}</div>
                              )}
                    </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}><strong>Profile Picture:</strong> {profile.profile_picture_url ? <a href={profile.profile_picture_url} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</Col>
                </Row>
                <Row className="mt-2">
                  <Col><strong>Bio:</strong> {profile.bio}</Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profileFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profileLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profilePhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profileUniversity">
                      <Form.Label>University</Form.Label>
                      <Form.Control
                        type="text"
                        name="university"
                        value={profile.university}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profileMajor">
                      <Form.Label>Major</Form.Label>
                      <Form.Control
                        type="text"
                        name="major"
                        value={profile.major}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profileGraduationYear">
                      <Form.Label>Graduation Year</Form.Label>
                      <Form.Control
                        type="number"
                        name="graduation_year"
                        value={profile.graduation_year}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profileResumeUrl">
                      <Form.Label>Resume URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="resume_url"
                        value={profile.resume_url}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="profilePictureUrl">
                      <Form.Label>Profile Picture URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="profile_picture_url"
                        value={profile.profile_picture_url}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="profileBio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button variant="secondary" type="button" disabled={isSubmitting} onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : 'Save Changes'}
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

export default StudentProfile; 