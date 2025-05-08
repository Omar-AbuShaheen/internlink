import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import '../styles/RegisterForm.css';
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
    <div className="login-wrapper">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Register</h3>

        <p className="text-muted text-center">
          Join InternLink to discover internships and connect with top companies.
        </p>

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

          <Button type="submit" className="w-100" variant="success">
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
