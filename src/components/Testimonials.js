import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    quote: "InternLink constantly has great opportunities with mentors and recruiters working on your side.",
    author: "Sarah Johnson",
    title: "Computer Science Student",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random"
  },
  {
    id: 2,
    quote: "InternLink is a great platform! I feel like you are really committed to connecting users with the right opportunities.",
    author: "Michael Chen",
    title: "Software Engineering Intern",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random"
  },
  {
    id: 3,
    quote: "I have never used a platform like InternLink before to apply for roles. It felt a lot less overwhelming than other job sites.",
    author: "Emily Rodriguez",
    title: "Marketing Student",
    avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=random"
  }
];

function Testimonials() {
  return (
    <section className="testimonial-section py-5">
      <Container>
        <h2 className="text-center mb-5">What Our Users Say</h2>
        <Row>
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} lg={4} md={6} className="mb-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h5 className="author-name">{testimonial.author}</h5>
                    <p className="author-title">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;
