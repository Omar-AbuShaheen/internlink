import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaBullseye, FaHandshake, FaUsers } from 'react-icons/fa';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="aboutus-bg py-5">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={8}>
            <Card className="aboutus-card shadow-lg p-4 text-center">
              <h2 className="text-primary mb-3">About Us</h2>
              <p className="lead mb-4">
                InternLink was founded with the mission to empower students by making internship searches easier and more transparent. We work with leading companies and universities to provide meaningful internship experiences that help students launch their careers.
              </p>
              <Row className="mt-4">
                <Col md={4} className="mb-3">
                  <FaBullseye size={36} className="text-primary mb-2" />
                  <h5 className="fw-bold">Our Mission</h5>
                  <p className="small">Empowering students to find the right opportunities and build successful careers.</p>
                </Col>
                <Col md={4} className="mb-3">
                  <FaHandshake size={36} className="text-primary mb-2" />
                  <h5 className="fw-bold">Our Partners</h5>
                  <p className="small">Collaborating with top companies and universities for real-world experience.</p>
                </Col>
                <Col md={4} className="mb-3">
                  <FaUsers size={36} className="text-primary mb-2" />
                  <h5 className="fw-bold">Our Community</h5>
                  <p className="small">A growing network of students, mentors, and employers.</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
