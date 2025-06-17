import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const initialState = {
  title: '',
  description: '',
  location: '',
  type: '',
  deadline: '',
  skills: '',
  duration: '',
  is_remote: false,
};

const typeOptions = ['On-site', 'Remote', 'Hybrid'];

function EditInternshipForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch internship data
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/internships/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch internship');
        const data = await res.json();
        setForm({
          title: data.title || '',
          description: data.description || '',
          location: data.location || '',
          type: data.type || '',
          deadline: data.deadline ? data.deadline.slice(0, 10) : '',
          skills: data.requirements || '',
          duration: data.duration || '',
          is_remote: data.is_remote || false,
        });
      } catch (err) {
        setErrorMsg('Failed to load internship data.');
      } finally {
        setLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (!form.location.trim()) newErrors.location = 'Location is required.';
    if (!form.type) newErrors.type = 'Type is required.';
    if (!form.deadline) newErrors.deadline = 'Deadline is required.';
    if (!form.skills.trim()) newErrors.skills = 'At least one skill is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/internships/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          requirements: form.skills,
          location: form.location,
          type: form.type,
          duration: form.duration,
          is_remote: form.type === 'Remote',
          deadline: form.deadline
        })
      });
      if (!response.ok) throw new Error('Failed to update internship');
      setSuccess(true);
      setTimeout(() => navigate('/company/dashboard'), 1200);
    } catch (err) {
      setErrorMsg('Failed to update internship. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3 text-muted">Loading internship data...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow-lg p-4">
            <h3 className="mb-4 text-primary">Edit Internship</h3>
            {success && (
              <Alert variant="success">Internship updated successfully!</Alert>
            )}
            {errorMsg && (
              <Alert variant="danger">{errorMsg}</Alert>
            )}
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Group className="mb-3" controlId="editTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="e.g. Frontend Developer Intern"
                  value={form.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="editDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Describe the role, responsibilities, and requirements."
                  value={form.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="e.g. New York, NY"
                      value={form.location}
                      onChange={handleChange}
                      isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editType">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      isInvalid={!!errors.type}
                    >
                      <option value="">Select type</option>
                      {typeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editDeadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      value={form.deadline}
                      onChange={handleChange}
                      isInvalid={!!errors.deadline}
                    />
                    <Form.Control.Feedback type="invalid">{errors.deadline}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editSkills">
                    <Form.Label>Required Skills</Form.Label>
                    <Form.Control
                      type="text"
                      name="skills"
                      placeholder="e.g. React, Communication, Teamwork"
                      value={form.skills}
                      onChange={handleChange}
                      isInvalid={!!errors.skills}
                    />
                    <Form.Text className="text-muted">Comma-separated</Form.Text>
                    <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editDuration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      placeholder="e.g. 3 months"
                      value={form.duration}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editIsRemote">
                    <Form.Label>Remote</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Is this a remote internship?"
                      name="is_remote"
                      checked={form.type === 'Remote'}
                      onChange={e => setForm({ ...form, type: e.target.checked ? 'Remote' : form.type === 'Remote' ? '' : form.type })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" type="button" disabled={isSubmitting} onClick={() => navigate('/company/dashboard')}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : 'Update Internship'}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditInternshipForm; 