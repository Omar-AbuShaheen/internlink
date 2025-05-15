import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import '../styles/Testimonials.css';

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function Testimonials() {
  const testimonials = [
    {
      name: 'Raphael R',
      university: 'New York University',
      text: 'InternLink constantly has great job postings and recruiters working on your side. Furthermore, many employers reach out to you directly.',
    },
    {
      name: 'Alexander C',
      university: 'University of Georgia',
      text: 'InternLink is a great platform. I feel like you are really committed to connecting users such as myself to as many job offerings as you can find.',
    },
    {
      name: 'Ivana U',
      university: 'Georgia Institute of Technology',
      text: 'I have never used a platform like InternLink before to apply for roles. It felt a lot less intimidating and was less hassle than your traditional college career fair.',
    },
  ];

  return (
    <Container className="testimonials-section my-5 py-4">
      <h2 className="text-center mb-5 fw-bold">Our users love us. See for yourself.</h2>
      <Row className="justify-content-center g-4">
        {testimonials.map((item, index) => (
          <Col md={4} key={index} className="d-flex align-items-stretch">
            <Card className="testimonial-card h-100 shadow-lg border-0">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaQuoteLeft className="quote-icon mb-3 text-primary" size={32} />
                <Card.Text className="testimonial-text mb-4">{item.text}</Card.Text>
                <div className="testimonial-avatar mb-2">
                  {getInitials(item.name)}
                </div>
                <div className="mb-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-warning" />)}
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small className="text-muted">{item.university}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;
