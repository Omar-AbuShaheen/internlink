import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement actual login logic here
      console.log('Login:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth login
      console.log('Google login clicked');
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement LinkedIn OAuth login
      console.log('LinkedIn login clicked');
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error('LinkedIn login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
      <Card className="auth-card p-4 shadow-lg">
        <div className="text-center mb-3">
          <img 
            src={logo} 
            alt="InternLink Logo" 
            width={56} 
            height={56} 
            className="mb-2 rounded-circle border border-primary bg-white"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <h3 className="mb-1">Sign In</h3>
          <p className="text-muted mb-0">Welcome back to InternLink! Sign in to access your dashboard.</p>
        </div>

        {/* Social Login Buttons */}
        <Row className="mb-3 g-2">
          <Col xs={12} sm={6}>
            <Button 
              variant="outline-danger" 
              className="w-100 mb-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <i className="fab fa-google me-2"></i> Google
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button 
              variant="outline-primary" 
              className="w-100 mb-2"
              onClick={handleLinkedInLogin}
              disabled={isLoading}
            >
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </Form.Group>

          <Button 
            type="submit" 
            className="w-100 mb-2" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            onClick={handleRegisterClick}
            style={{ cursor: 'pointer' }}
          >
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginForm;
