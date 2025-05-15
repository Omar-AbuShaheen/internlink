import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    console.log('Register:', { username, email, password });
  };

  return (
    <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
      <Card className="auth-card p-4 shadow-lg">
        <div className="text-center mb-3">
          <img src={logo} alt="InternLink Logo" width={56} height={56} className="mb-2 rounded-circle border border-primary bg-white" />
          <h3 className="mb-1">Register</h3>
          <p className="text-muted mb-0">Join InternLink to discover internships and connect with top companies.</p>
        </div>

        {/* Social Login Buttons (demo only) */}
        <Row className="mb-3 g-2">
          <Col xs={12} sm={6}>
            <Button variant="outline-danger" className="w-100 mb-2">
              <i className="fab fa-google me-2"></i> Google
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button variant="outline-primary" className="w-100 mb-2">
              <i className="fab fa-linkedin me-2"></i> LinkedIn
            </Button>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="registerUsername">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-user"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerEmail">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerPassword">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4" controlId="registerConfirmPassword">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Button type="submit" className="w-100 mb-2" variant="success">
            Register
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterForm;
