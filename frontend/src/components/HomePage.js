import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaSearch, FaBuilding, FaUsers, FaGraduationCap, FaArrowRight, FaMapMarkerAlt, FaClock, FaRocket, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Testimonials from './Testimonials';
import '../styles/HomePage.css';
import { AuthContext } from '../context/AuthContext';
// Import images
import heroBg from '../images/hero-bg.jpg';
import marketingLogo from '../images/marketing-logo.png';
import techLogo from '../images/tech-logo.png';
import designLogo from '../images/design-logo.png';

function HomePage() {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredInternships, setFeaturedInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/internships/');
        const data = await res.json();
        setFeaturedInternships(data.slice(0, 3));
      } catch (err) {
        setFeaturedInternships([]);
      }
    };
    fetchInternships();
  }, []);

  const handleFindInternships = () => {
    navigate('/internships');
  };

  const handlePostJob = () => {
    navigate('/company/dashboard/post-job');
  };

  const handleApplyNow = (internshipId) => {
    navigate(`/internships/${internshipId}`);
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg})` }}>
        <div className="hero-overlay">
          <Container className="hero-content">
            <div className="hero-badge mb-4">
              <Badge bg="light" text="primary" className="px-3 py-2 fs-6">
                <FaRocket className="me-2" />
                Your Career Starts Here
              </Badge>
            </div>
            <h1 className="display-3 fw-bold text-white mb-4 hero-title">
              Launch Your Career 
              <span className="text-gradient"> Journey</span>
            </h1>
            <p className="lead text-white mb-5 hero-subtitle">
              Connect with leading companies and discover opportunities that shape your future.
              <br />
              <strong>Join 10,000+ students</strong> who found their dream internships.
            </p>
            <div className="hero-buttons d-flex justify-content-center gap-3 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                className="px-4 py-3 hero-btn-primary"
                onClick={() => navigate('/internships')}
              >
                <FaSearch className="me-2" />
                Find Internships
                <FaArrowRight className="ms-2" />
              </Button>
              {role === 'company' && (
                <Button
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3 hero-btn-outline"
                  onClick={() => navigate('/company/dashboard/post-job')}
                >
                  <FaBuilding className="me-2" />
                  Post a Job
                </Button>
              )}
              {role !== 'company' && (
                <Button
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3 hero-btn-outline"
                  onClick={() => navigate('/register')}
                >
                  <FaUsers className="me-2" />
                  Get Started
                </Button>
              )}
            </div>
            
            {/* Floating Elements */}
            <div className="hero-floating-elements">
              <div className="floating-card floating-card-1">
                <FaStar className="text-warning" />
                <span className="ms-2">Top Rated</span>
              </div>
              <div className="floating-card floating-card-2">
                <FaClock className="text-info" />
                <span className="ms-2">Quick Apply</span>
              </div>
              <div className="floating-card floating-card-3">
                <FaRocket className="text-success" />
                <span className="ms-2">Fast Track</span>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item modern-stat-card">
                <div className="stat-icon-wrapper">
                  <FaUsers className="stat-icon" />
                </div>
                <h3 className="stat-number">10,000+</h3>
                <p className="stat-label">Active Students</p>
                <div className="stat-progress">
                  <div className="progress-bar" style={{width: '85%'}}></div>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item modern-stat-card">
                <div className="stat-icon-wrapper">
                  <FaBuilding className="stat-icon" />
                </div>
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Partner Companies</p>
                <div className="stat-progress">
                  <div className="progress-bar" style={{width: '70%'}}></div>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item modern-stat-card">
                <div className="stat-icon-wrapper">
                  <FaGraduationCap className="stat-icon" />
                </div>
                <h3 className="stat-number">2,000+</h3>
                <p className="stat-label">Successful Placements</p>
                <div className="stat-progress">
                  <div className="progress-bar" style={{width: '95%'}}></div>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item modern-stat-card">
                <div className="stat-icon-wrapper">
                  <FaSearch className="stat-icon" />
                </div>
                <h3 className="stat-number">5,000+</h3>
                <p className="stat-label">Active Listings</p>
                <div className="stat-progress">
                  <div className="progress-bar" style={{width: '90%'}}></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Internships */}
      <section className="featured-internships py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Featured Opportunities</h2>
            <p className="section-subtitle text-muted">
              Discover hand-picked internship opportunities from top companies
            </p>
          </div>
          <Row>
            {featuredInternships.length === 0 ? (
              <Col>
                <div className="empty-state text-center py-5">
                  <FaSearch size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No featured internships available</h5>
                  <p className="text-muted">Check back soon for new opportunities!</p>
                </div>
            </Col>
            ) : (
              featuredInternships.map((internship, index) => (
                <Col md={4} className="mb-4" key={internship.id}>
                  <Card className="h-100 modern-internship-card" style={{'--delay': `${index * 0.1}s`}}>
                    <div className="card-header-modern">
                      <Badge bg="primary" className="position-absolute top-0 start-0 m-3">
                        Featured
                      </Badge>
                <div className="card-img-wrapper">
                        <Card.Img variant="top" src={internship.company_logo_url || marketingLogo} className="card-img" />
                </div>
                  </div>
                    <Card.Body className="p-4">
                      <Card.Title className="mb-3 fw-bold">{internship.title}</Card.Title>
                      <Card.Text className="text-muted mb-3">
                        {internship.description?.slice(0, 90) || 'No description provided.'}...
                      </Card.Text>
                      
                      <div className="card-meta mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaMapMarkerAlt className="text-primary me-2" size={14} />
                          <span className="small text-muted">{internship.location || 'Remote'}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <FaClock className="text-primary me-2" size={14} />
                          <span className="small text-muted">{internship.type || 'Full-time'}</span>
                        </div>
                </div>
                      
                    <Button 
                      variant="primary" 
                        className="w-100 modern-apply-btn"
                        onClick={() => handleApplyNow(internship.id)}
                    >
                      Apply Now
                        <FaArrowRight className="ms-2" size={14} />
                    </Button>
                </Card.Body>
              </Card>
            </Col>
              ))
            )}
          </Row>
          
          {featuredInternships.length > 0 && (
            <div className="text-center mt-5">
              <Button 
                variant="outline-primary" 
                size="lg" 
                className="px-5"
                onClick={() => navigate('/internships')}
              >
                View All Opportunities
                <FaArrowRight className="ms-2" />
              </Button>
            </div>
          )}
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
              <Button 
                variant="light" 
                size="lg" 
                className="px-4"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
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
