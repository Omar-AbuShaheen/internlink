import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../images/logo.png'; // adjust path if needed
import '../styles/NavBar.css';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="InternLink logo"
          />{' '}
          InternLink
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-primary" className="me-2">Sign In</Button>
            <Button variant="primary">Log In</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
