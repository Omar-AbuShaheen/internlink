import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container className="py-5 text-center">
      <Card className="shadow-lg p-5 mx-auto" style={{ maxWidth: 480 }}>
        <FaExclamationTriangle className="text-warning mb-3" size={48} />
        <h2 className="mb-3">404 - Page Not Found</h2>
        <p className="text-muted mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}> 
          <FaHome className="me-2" />Go to Home
        </Button>
      </Card>
    </Container>
  );
}

export default NotFound; 