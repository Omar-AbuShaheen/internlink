import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, NavDropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/NavBar.css';

function NavigationBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="white" expand="lg" className="main-navbar shadow-sm sticky-top py-2" style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.95)' }}>
      <Container>
        <Navbar.Brand 
          onClick={handleLogoClick}
          className="d-flex align-items-center gap-2"
          style={{ cursor: 'pointer' }}
        >
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
            <Nav.Link 
              onClick={() => handleNavLinkClick('/')} 
              className="nav-link-custom"
              style={{ cursor: 'pointer' }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/internships')} 
              className="nav-link-custom"
              style={{ cursor: 'pointer' }}
            >
              Internships
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/services')} 
              className="nav-link-custom"
              style={{ cursor: 'pointer' }}
            >
              Services
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/about')} 
              className="nav-link-custom"
              style={{ cursor: 'pointer' }}
            >
              About Us
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/sitemap')} 
              className="nav-link-custom"
              style={{ cursor: 'pointer' }}
            >
              Site Map
            </Nav.Link>
            <NavDropdown 
              title="Clients" 
              id="clients-dropdown" 
              className="nav-link-custom"
              show={isDropdownOpen}
              onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
            >
              <NavDropdown.Item 
                onClick={() => handleNavLinkClick('/student/dashboard')}
                style={{ cursor: 'pointer' }}
              >
                Student
              </NavDropdown.Item>
              <NavDropdown.Item 
                onClick={() => handleNavLinkClick('/company/dashboard')}
                style={{ cursor: 'pointer' }}
              >
                Company
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="align-items-center gap-2 ms-lg-4">
            <Button 
              onClick={handleSignIn}
              variant="outline-primary" 
              className="me-2 px-4 rounded-pill fw-semibold"
            >
              Sign In
            </Button>
            <Button 
              onClick={handleRegister}
              variant="primary" 
              className="px-4 rounded-pill fw-semibold"
            >
              Register
            </Button>
            <div 
              className="ms-3 d-none d-lg-block"
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            >
              <Image 
                src="https://ui-avatars.com/api/?name=User&background=0d6efd&color=fff&rounded=true&size=40" 
                roundedCircle 
                width={40} 
                height={40} 
                alt="Profile" 
                style={{ boxShadow: '0 2px 8px rgba(13,110,253,0.15)' }} 
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
