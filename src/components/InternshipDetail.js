import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import '../styles/InternshipDetail.css';

// Reuse the same mock data (later replace with API call)
const mockInternships = [
  { id: 1, title: 'Marketing Intern', company: 'Top Agency', description: 'Help with marketing campaigns and grow your skills.', logo: require('../images/marketing-logo.png'), location: 'New York, NY', type: 'On-site', skills: ['Marketing', 'Communication'] },
  { id: 2, title: 'Software Engineer Intern', company: 'Tech Startup', description: 'Join a fast-paced tech team and build awesome products.', logo: require('../images/tech-logo.png'), location: 'Remote', type: 'Remote', skills: ['React', 'JavaScript'] },
  { id: 3, title: 'Design Intern', company: 'Creative Studio', description: 'Collaborate on creative projects for global brands.', logo: require('../images/design-logo.png'), location: 'Los Angeles, CA', type: 'On-site', skills: ['Design', 'Creativity'] },
  { id: 4, title: 'Finance Intern', company: 'Finance Firm', description: 'Support financial analysis and reporting tasks.', logo: require('../images/logo.png'), location: 'Chicago, IL', type: 'Hybrid', skills: ['Finance', 'Excel'] },
];

function InternshipDetail() {
  const { id } = useParams();
  const internship = mockInternships.find((item) => item.id === parseInt(id));

  if (!internship) {
    return (
      <Container className="mt-5">
        <h2>Internship Not Found</h2>
        <Button as={Link} to="/internships" variant="primary">
          Back to Listings
        </Button>
      </Container>
    );
  }

  return (
    <Container className="internship-detail-container py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="internship-detail-card shadow-lg">
            <div className="internship-detail-header d-flex align-items-center gap-3 p-4 border-bottom">
              <img src={internship.logo} alt={internship.company} width={64} height={64} className="rounded-circle border bg-white" />
              <div>
                <h3 className="mb-1">{internship.title}</h3>
                <span className="text-muted"><FaBuilding className="me-1" />{internship.company}</span>
              </div>
            </div>
            <Card.Body className="p-4">
              <div className="mb-3">
                <Badge bg="info" className="me-2"><FaMapMarkerAlt className="me-1" />{internship.location}</Badge>
                <Badge bg="secondary" className="me-2">{internship.type}</Badge>
                {internship.skills.map((skill, i) => (
                  <Badge key={i} bg="light" text="primary" className="me-1">{skill}</Badge>
                ))}
              </div>
              <Card.Text className="mb-4" style={{ fontSize: '1.1rem' }}>{internship.description}</Card.Text>
              <div className="d-flex gap-2">
                <Button variant="success" size="lg" className="px-4 rounded-pill fw-semibold">
                  Apply Now
                </Button>
                <Button as={Link} to="/internships" variant="outline-primary" size="lg" className="px-4 rounded-pill">
                  Back to Listings
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InternshipDetail;
