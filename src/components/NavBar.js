import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container, Image, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaCog, FaBriefcase, FaHome, FaInfoCircle, FaConciergeBell, FaTachometerAlt, FaUserShield } from 'react-icons/fa';
import logo from '../images/logo.png';
import '../styles/NavBar.css';
import { AuthContext } from '../context/AuthContext';

function NavigationBar() {
  const navigate = useNavigate();
  const { role, logout } = useContext(AuthContext);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleProfileClick = () => {
    if (role === 'company') {
      navigate('/company/profile');
    } else {
      navigate('/profile');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplayName = () => {
    switch(role) {
      case 'student': return 'Student';
      case 'company': return 'Company';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const getDashboardPath = () => {
    switch(role) {
      case 'student': return '/student/dashboard';
      case 'company': return '/company/dashboard';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  return (
    <Navbar expand="lg" className="professional-navbar sticky-top">
      <Container>
        {/* Brand Logo and Title */}
        <Navbar.Brand 
          onClick={handleLogoClick}
          className="navbar-brand-custom"
        >
          <div className="brand-logo">
            <img
              src={logo}
              alt="InternLink"
              className="brand-image"
            />
          </div>
          <span className="brand-text">InternLink</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggler-custom">
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          {/* Main Navigation Links */}
          <Nav className="navbar-nav-custom mx-auto">
            <Nav.Link 
              onClick={() => handleNavLinkClick('/')} 
              className="nav-link-professional"
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/internships')} 
              className="nav-link-professional"
            >
              <FaBriefcase className="nav-icon" />
              <span>Internships</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/services')} 
              className="nav-link-professional"
            >
              <FaConciergeBell className="nav-icon" />
              <span>Services</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavLinkClick('/about')} 
              className="nav-link-professional"
            >
              <FaInfoCircle className="nav-icon" />
              <span>About</span>
            </Nav.Link>
            
            {/* Role-specific Dashboard Link */}
            {role && (
              <Nav.Link 
                onClick={() => handleNavLinkClick(getDashboardPath())} 
                className="nav-link-professional dashboard-link"
              >
                {role === 'admin' ? <FaUserShield className="nav-icon" /> : <FaTachometerAlt className="nav-icon" />}
                <span>Dashboard</span>
              </Nav.Link>
            )}
          </Nav>

          {/* User Actions */}
          <Nav className="navbar-actions">
            {!role ? (
              <div className="auth-buttons">
                <Button 
                  onClick={handleSignIn} 
                  variant="outline-primary" 
                  className="btn-signin"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleRegister} 
                  variant="primary" 
                  className="btn-register"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <Dropdown align="end" className="user-dropdown">
                <Dropdown.Toggle 
                  variant="link" 
                  id="user-dropdown" 
                  className="user-dropdown-toggle"
                >
                  <div className="user-avatar">
                    <Image 
                      src={`https://ui-avatars.com/api/?name=${getRoleDisplayName()}&background=0d6efd&color=fff&rounded=true&size=40&bold=true`}
                      roundedCircle 
                      width={40} 
                      height={40} 
                      alt="Profile" 
                    />
                    <div className="user-info d-none d-lg-block">
                      <span className="user-role">{getRoleDisplayName()}</span>
                      <div className="status-indicator"></div>
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="user-dropdown-menu">
                  <div className="dropdown-header">
                    <div className="user-avatar-large">
                      <Image 
                        src={`https://ui-avatars.com/api/?name=${getRoleDisplayName()}&background=0d6efd&color=fff&rounded=true&size=48&bold=true`}
                        roundedCircle 
                        width={48} 
                        height={48} 
                        alt="Profile" 
                      />
                    </div>
                    <div className="user-details">
                      <span className="user-name">{getRoleDisplayName()} Account</span>
                      <span className="user-email">Logged in as {role}</span>
                    </div>
                  </div>
                  
                  <Dropdown.Divider />
                  
                  <Dropdown.Item onClick={handleProfileClick} className="dropdown-item-custom">
                    <FaUser className="dropdown-icon" />
                    <span>My Profile</span>
                  </Dropdown.Item>
                  
                  <Dropdown.Item onClick={() => handleNavLinkClick(getDashboardPath())} className="dropdown-item-custom">
                    <FaTachometerAlt className="dropdown-icon" />
                    <span>Dashboard</span>
                  </Dropdown.Item>
                  
                  <Dropdown.Divider />
                  
                  <Dropdown.Item onClick={handleLogout} className="dropdown-item-custom logout-item">
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Sign Out</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
