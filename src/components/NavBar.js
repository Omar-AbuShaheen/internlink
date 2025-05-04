import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/NavBar.css';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 border-bottom border-primary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="InternLink logo"
          />{' '}
          <span className="text-primary fw-bold">InternLink</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-primary">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/internships" className="text-primary">
            Internships
          </Nav.Link>
            <Nav.Link as={Link} to="/services" className="text-primary">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-primary">
              About Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Button as={Link} to="/login" variant="outline-primary" className="me-2">
              Sign In
            </Button>
            <Button as={Link} to="/register" variant="primary">
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
