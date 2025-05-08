import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Testimonials from './Testimonials';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <h1>Find Your Perfect Internship</h1>
        <p>Connect with top companies and kickstart your career journey.</p>
        <Button variant="primary" size="lg">Browse Internships</Button>
      </section>

      {/* Featured Internships */}
      <section className="featured-internships py-5">
        <Container>
          <h2 className="text-center mb-4">Featured Internships</h2>
          <Row>
            <Col md={4} className="mb-3">
              <Card className="h-100 text-center shadow-sm">
                {/* Optional logo image */}
                {/* <Card.Img variant="top" src="/images/marketing-logo.png" style={{ height: '120px', objectFit: 'contain' }} /> */}
                <Card.Body>
                  <Card.Title>Marketing Intern</Card.Title>
                  <Card.Text>Work with a top agency to grow your skills.</Card.Text>
                  <Button variant="outline-primary">Apply Now</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="h-100 text-center shadow-sm">
                {/* <Card.Img variant="top" src="/images/tech-logo.png" style={{ height: '120px', objectFit: 'contain' }} /> */}
                <Card.Body>
                  <Card.Title>Software Engineer Intern</Card.Title>
                  <Card.Text>Join an exciting tech startup this summer.</Card.Text>
                  <Button variant="outline-primary">Apply Now</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="h-100 text-center shadow-sm">
                {/* <Card.Img variant="top" src="/images/design-logo.png" style={{ height: '120px', objectFit: 'contain' }} /> */}
                <Card.Body>
                  <Card.Title>Design Intern</Card.Title>
                  <Card.Text>Collaborate on creative projects with top brands.</Card.Text>
                  <Button variant="outline-primary">Apply Now</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="homepage-footer text-center py-4">
        <Container>
          <small>© 2025 InternLink. All rights reserved. | About | Contact | Privacy Policy</small>
        </Container>
      </footer>
    </div>
  );
}

export default HomePage;
