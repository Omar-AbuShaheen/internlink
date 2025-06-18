import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaPlus, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaMapMarkerAlt, FaListAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  title: '',
  description: '',
  location: '',
  type: '',
  deadline: '',
  skills: '',
  duration: '',
};

const typeOptions = ['On-site', 'Remote', 'Hybrid'];

function PostInternshipForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { role } = useContext(AuthContext);
  let company_id = null;
  if (role === 'company') {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      company_id = decoded.id; // assuming your JWT includes the user's id
    }
  }

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
      const response = await fetch('http://localhost:5000/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          company_id,
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
      if (!response.ok) {
        const errorBody = await response.json();
        console.error("POST /internships error:", errorBody, "response status:", response.status);
        throw new Error(errorBody.message || "Failed to post internship");
      }
      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      setErrorMsg(err.message || "Failed to post internship. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow-lg p-4">
            <h3 className="mb-4 text-primary"><FaPlus className="me-2" />Post a New Internship</h3>
            {success && (
              <Alert variant="success" className="d-flex align-items-center">
                <FaCheckCircle className="me-2" /> Internship posted successfully!
              </Alert>
            )}
            {errorMsg && (
              <Alert variant="danger" className="d-flex align-items-center">
                <FaTimesCircle className="me-2" /> {errorMsg}
              </Alert>
            )}
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Group className="mb-3" controlId="postTitle">
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
              <Form.Group className="mb-3" controlId="postDescription">
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
                  <Form.Group className="mb-3" controlId="postLocation">
                    <Form.Label><FaMapMarkerAlt className="me-1 text-info" />Location</Form.Label>
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
                  <Form.Group className="mb-3" controlId="postType">
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
                  <Form.Group className="mb-3" controlId="postDeadline">
                    <Form.Label><FaCalendarAlt className="me-1 text-danger" />Deadline</Form.Label>
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
                  <Form.Group className="mb-3" controlId="postSkills">
                    <Form.Label><FaListAlt className="me-1 text-success" />Required Skills</Form.Label>
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
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" type="button" disabled={isSubmitting} onClick={() => setForm(initialState)}>
                  Clear
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : <FaPlus className="me-2" />}Post Internship
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PostInternshipForm; 