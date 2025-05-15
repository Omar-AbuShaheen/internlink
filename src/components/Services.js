import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaListAlt, FaFileAlt, FaChartLine, FaBuilding } from 'react-icons/fa';
import '../styles/Services.css';

function Services() {
  return (
    <div className="services-bg py-5">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={8}>
            <Card className="services-card shadow-lg p-4 text-center">
              <h2 className="text-primary mb-3">Our Services</h2>
              <p className="lead mb-4">
                InternLink offers students a platform to discover and apply for exciting internship opportunities. We connect students with top companies, provide resources for career development, and streamline the application process.
              </p>
              <Row className="mt-4 g-3">
                <Col md={6}>
                  <Card className="service-feature-card p-3 border-0 h-100 text-center">
                    <FaListAlt size={32} className="text-primary mb-2" />
                    <h5 className="fw-bold">Internship Listings</h5>
                    <p className="small">Browse curated internships from top companies and organizations.</p>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="service-feature-card p-3 border-0 h-100 text-center">
                    <FaFileAlt size={32} className="text-primary mb-2" />
                    <h5 className="fw-bold">Resume Review & Tips</h5>
                    <p className="small">Get expert feedback and tips to improve your resume and applications.</p>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="service-feature-card p-3 border-0 h-100 text-center">
                    <FaChartLine size={32} className="text-primary mb-2" />
                    <h5 className="fw-bold">Application Tracking</h5>
                    <p className="small">Easily track your internship applications and progress in one place.</p>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="service-feature-card p-3 border-0 h-100 text-center">
                    <FaBuilding size={32} className="text-primary mb-2" />
                    <h5 className="fw-bold">Company Profiles</h5>
                    <p className="small">Explore detailed profiles of partner companies and their opportunities.</p>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Services;
