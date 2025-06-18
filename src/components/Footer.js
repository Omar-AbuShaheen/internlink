import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaTwitter, 
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
  FaHeart,
  FaGraduationCap,
  FaBriefcase,
  FaUsers,
  FaShieldAlt
} from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <Container>
          <Row className="g-5">
            {/* Brand Section */}
            <Col lg={4} md={6}>
              <div className="footer-brand">
                <div className="brand-logo-section">
                  <div className="brand-icon">
                    <FaGraduationCap size={32} />
                  </div>
                  <h4 className="brand-name">InternLink</h4>
                </div>
                <p className="brand-description">
                  Connecting talented students with amazing internship opportunities. 
                  Your gateway to a successful career starts here.
                </p>
                <div className="footer-stats">
                  <div className="stat-item">
                    <FaUsers className="stat-icon" />
                    <span>10,000+ Students</span>
                  </div>
                  <div className="stat-item">
                    <FaBriefcase className="stat-icon" />
                    <span>5,000+ Internships</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h5 className="section-title">Platform</h5>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/internships">Browse Internships</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </Col>

            {/* For Students */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h5 className="section-title">For Students</h5>
                <ul className="footer-links">
                  <li><a href="/register">Sign Up</a></li>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/profile">My Profile</a></li>
                  <li><a href="/applications">My Applications</a></li>
                  {/* <li><a href="/help">Career Tips</a></li> */}
                </ul>
              </div>
            </Col>

            {/* Contact Info */}
            <Col lg={4} md={6}>
              <div className="footer-section">
                <h5 className="section-title">Get in Touch</h5>
                <div className="contact-info">
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>info@internlink.com</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>123 Career Avenue, Suite 100<br />University City, UC 12345</span>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="newsletter-section">
                  <h6 className="newsletter-title">Stay Updated</h6>
                  <p className="newsletter-description">Get the latest internship opportunities delivered to your inbox.</p>
                  <div className="newsletter-form">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="newsletter-input"
                    />
                    <Button className="newsletter-btn">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Social Media Section */}
      <div className="footer-social-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="social-message">
                <h6>Connect with us on social media</h6>
                <p>Follow for the latest updates and career tips</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="social-links">
                <a href="https://linkedin.com/company/internlink" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/internlink" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/internlink" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <FaInstagram />
                </a>
                <a href="https://github.com/internlink" target="_blank" rel="noopener noreferrer" className="social-link github">
                  <FaGithub />
                </a>
                <a href="mailto:info@internlink.com" className="social-link email">
                  <FaEnvelope />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="copyright">
                <p>© 2025 InternLink. All rights reserved.</p>
                <div className="legal-links">
                  <a href="/privacy">Privacy Policy</a>
                  <span className="separator">|</span>
                  <a href="/terms">Terms of Service</a>
                  <span className="separator">|</span>
                  <a href="/cookies">Cookie Policy</a>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="footer-actions">
                <div className="trust-indicators">
                  <div className="trust-item">
                    <FaShieldAlt className="trust-icon" />
                    <span>Secure Platform</span>
                  </div>
                </div>
                <Button 
                  className="scroll-to-top-btn"
                  onClick={scrollToTop}
                  title="Back to top"
                >
                  <FaArrowUp />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Love Message */}
      <div className="footer-love">
        <Container>
          <div className="text-center">
            <p>
              Made with <FaHeart className="heart-icon" /> for students everywhere
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer; 