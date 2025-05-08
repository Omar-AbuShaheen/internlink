
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    <div className="login-wrapper">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Sign In</h3>

        <p className="text-muted text-center">
          Welcome back to InternLink! Sign in to access your dashboard.
        </p>

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

          <Button type="submit" className="w-100" variant="primary">
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
