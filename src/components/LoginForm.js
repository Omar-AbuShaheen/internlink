import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
      <Card className="auth-card p-4 shadow-lg">
        <div className="text-center mb-3">
          <img src={logo} alt="InternLink Logo" width={56} height={56} className="mb-2 rounded-circle border border-primary bg-white" />
          <h3 className="mb-1">Sign In</h3>
          <p className="text-muted mb-0">Welcome back to InternLink! Sign in to access your dashboard.</p>
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

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-user"></i>
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

          <Form.Group className="mb-4" controlId="loginPassword">
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

          <Button type="submit" className="w-100 mb-2" variant="primary">
            Login
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginForm;
