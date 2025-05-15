import React from 'react';
import { Navbar, Nav, Button, Container, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/NavBar.css';

function NavigationBar() {
  return (
    <Navbar bg="white" expand="lg" className="main-navbar shadow-sm sticky-top py-2" style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.95)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src={logo}
            width="48"
            height="48"
            className="d-inline-block align-top rounded-circle border border-primary"
            alt="InternLink logo"
            style={{ background: '#fff', padding: '4px' }}
          />
          <span className="brand-title text-primary fw-bold fs-3">InternLink</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="main-nav-links mx-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/internships" className="nav-link-custom">
              Internships
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-link-custom">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About Us
            </Nav.Link>
            <NavDropdown title="Clients" id="clients-dropdown" className="nav-link-custom">
              <NavDropdown.Item as={Link} to="/student/dashboard">
                Student
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/company/dashboard">
                Company
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="align-items-center gap-2 ms-lg-4">
            <Button as={Link} to="/login" variant="outline-primary" className="me-2 px-4 rounded-pill fw-semibold">
              Sign In
            </Button>
            <Button as={Link} to="/register" variant="primary" className="px-4 rounded-pill fw-semibold">
              Register
            </Button>
            {/* Profile/Avatar Placeholder */}
            <div className="ms-3 d-none d-lg-block">
              <Link to="/profile">
                <Image src="https://ui-avatars.com/api/?name=User&background=0d6efd&color=fff&rounded=true&size=40" roundedCircle width={40} height={40} alt="Profile" style={{ cursor: 'pointer', boxShadow: '0 2px 8px rgba(13,110,253,0.15)' }} />
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
