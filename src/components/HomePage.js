import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { FaSearch, FaBuilding, FaUsers, FaGraduationCap } from 'react-icons/fa';
import Testimonials from './Testimonials';
import '../styles/HomePage.css';
// Import images
import heroBg from '../images/hero-bg.jpg';
import marketingLogo from '../images/marketing-logo.png';
import techLogo from '../images/tech-logo.png';
import designLogo from '../images/design-logo.png';

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg})` }}>
        <div className="hero-overlay">
          <Container className="hero-content">
            <h1 className="display-3 fw-bold text-white mb-4">Launch Your Career Journey</h1>
            <p className="lead text-white mb-5">Connect with leading companies and discover opportunities that shape your future</p>
            <div className="d-flex gap-3 justify-content-center">
              <Button variant="primary" size="lg" className="px-4 py-2">Find Internships</Button>
              <Button variant="outline-light" size="lg" className="px-4 py-2">Post a Job</Button>
            </div>
          </Container>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <FaUsers className="stat-icon mb-3" />
                <h3 className="stat-number">10,000+</h3>
                <p className="stat-label">Active Students</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <FaBuilding className="stat-icon mb-3" />
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Partner Companies</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <FaGraduationCap className="stat-icon mb-3" />
                <h3 className="stat-number">2,000+</h3>
                <p className="stat-label">Successful Placements</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <FaSearch className="stat-icon mb-3" />
                <h3 className="stat-number">5,000+</h3>
                <p className="stat-label">Active Listings</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Internships */}
      <section className="featured-internships py-5">
        <Container>
          <h2 className="section-title text-center mb-5">Featured Opportunities</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 internship-card">
                <div className="card-img-wrapper">
                  <Card.Img variant="top" src={marketingLogo} className="card-img" />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="mb-3">Marketing Intern</Card.Title>
                  <Card.Text className="mb-4">Work with a top agency to grow your skills and build your portfolio.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="location">New York, NY</span>
                    <Button variant="primary" className="apply-btn">Apply Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 internship-card">
                <div className="card-img-wrapper">
                  <Card.Img variant="top" src={techLogo} className="card-img" />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="mb-3">Software Engineer Intern</Card.Title>
                  <Card.Text className="mb-4">Join an exciting tech startup and work on cutting-edge projects.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="location">San Francisco, CA</span>
                    <Button variant="primary" className="apply-btn">Apply Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 internship-card">
                <div className="card-img-wrapper">
                  <Card.Img variant="top" src={designLogo} className="card-img" />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="mb-3">Design Intern</Card.Title>
                  <Card.Text className="mb-4">Collaborate on creative projects with industry-leading brands.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="location">Los Angeles, CA</span>
                    <Button variant="primary" className="apply-btn">Apply Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="mb-4 mb-md-0">
              <h2 className="text-white mb-3">Ready to Start Your Journey?</h2>
              <p className="text-white-50 mb-0">Join thousands of students who have found their dream internships through InternLink.</p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="light" size="lg" className="px-4">Get Started</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

    
    </div>
  );
}

export default HomePage;
