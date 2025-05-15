import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="main-footer py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <small className="text-muted">© 2025 InternLink. All rights reserved.</small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="footer-links mb-2 mb-md-0">
              <a href="/about" className="text-muted me-3">About</a>
              <a href="/contact" className="text-muted me-3">Contact</a>
              <a href="/privacy" className="text-muted me-3">Privacy Policy</a>
            </div>
            <div className="footer-social mt-2 mt-md-0">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="me-3 text-primary"><FaLinkedin size={20} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="me-3 text-dark"><FaGithub size={20} /></a>
              <a href="mailto:info@internlink.com" className="text-danger"><FaEnvelope size={20} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 