import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';


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
      text: 'InternLink is a great platform. I feel like you’re really committed to connecting users such as myself to as many job offerings as you can find.',
    },
    {
      name: 'Ivana U',
      university: 'Georgia Institute of Technology',
      text: 'I’ve never used a platform like InternLink before to apply for roles. It felt a lot less intimidating and was less hassle than your traditional college career fair.',
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our users love us. See for yourself.</h2>
      <Row>
        {testimonials.map((item, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>"{item.text}"</Card.Text>
              </Card.Body>
              <Card.Footer>
                <strong>{item.name}</strong>
                <br />
                <small>{item.university}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;
