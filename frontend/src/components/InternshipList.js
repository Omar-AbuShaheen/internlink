import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaLaptop, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import '../styles/InternshipList.css';

const mockInternships = [
  {
    id: 1,
    title: 'Marketing Intern',
    company: 'Top Agency',
    description: 'Help with marketing campaigns and grow your skills.',
    logo: require('../images/marketing-logo.png'),
    type: 'On-site',
    location: 'New York, NY',
    skills: ['Marketing', 'Communication'],
  },
  {
    id: 2,
    title: 'Software Engineer Intern',
    company: 'Tech Startup',
    description: 'Join a fast-paced tech team and build awesome products.',
    logo: require('../images/tech-logo.png'),
    type: 'Remote',
    location: 'Remote',
    skills: ['React', 'JavaScript'],
  },
  {
    id: 3,
    title: 'Design Intern',
    company: 'Creative Studio',
    description: 'Collaborate on creative projects for global brands.',
    logo: require('../images/design-logo.png'),
    type: 'On-site',
    location: 'Los Angeles, CA',
    skills: ['Design', 'Creativity'],
  },
  {
    id: 4,
    title: 'Finance Intern',
    company: 'Finance Firm',
    description: 'Support financial analysis and reporting tasks.',
    logo: require('../images/logo.png'),
    type: 'Hybrid',
    location: 'Chicago, IL',
    skills: ['Finance', 'Excel'],
  },
];

function InternshipList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInternships(mockInternships);
        setFilteredInternships(mockInternships);
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Failed to load internships. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter((internship) =>
      internship.title.toLowerCase().includes(search.toLowerCase()) ||
      internship.company.toLowerCase().includes(search.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
      internship.location.toLowerCase().includes(search.toLowerCase()) ||
      internship.type.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [search, internships]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleViewDetails = (internshipId) => {
    navigate(`/internships/${internshipId}`);
  };

  if (isLoading) {
    return (
      <Container className="internship-list-container py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading internships...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="internship-list-container py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="internship-list-container py-5">
      <h2 className="text-primary mb-4 text-center">All Internship Opportunities</h2>
      <InputGroup className="mb-4 mx-auto internship-search-bar" style={{maxWidth: 500}}>
        <Form.Control
          placeholder="Search internships, companies, skills, location, or type..."
          value={search}
          onChange={handleSearch}
          aria-label="Search internships"
        />
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
      <Row>
        {filteredInternships.length === 0 ? (
          <Col className="text-center text-muted">
            <p className="mb-0">No internships found matching your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => setSearch('')}
              className="mt-2"
            >
              Clear search
            </Button>
          </Col>
        ) : (
          filteredInternships.map((internship) => (
            <Col md={6} lg={4} className="mb-4" key={internship.id}>
              <Card className="internship-card h-100 shadow-sm">
                <div className="internship-card-header d-flex align-items-center gap-3 p-3 border-bottom">
                  <img 
                    src={internship.logo} 
                    alt={internship.company} 
                    width={48} 
                    height={48} 
                    className="rounded-circle border" 
                  />
                  <div>
                    <h5 className="mb-0">{internship.title}</h5>
                    <span className="text-muted small">{internship.company}</span>
                  </div>
                </div>
                <Card.Body>
                  <Card.Text className="mb-2">{internship.description}</Card.Text>
                  <div className="mb-2">
                    <Badge bg="info" className="me-2">
                      <FaMapMarkerAlt className="me-1" />
                      {internship.location}
                    </Badge>
                    <Badge bg="secondary" className="me-2">
                      {internship.type}
                    </Badge>
                    {internship.skills.map((skill, i) => (
                      <Badge 
                        key={i} 
                        bg="light" 
                        text="primary" 
                        className="me-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSearch(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2 px-4 rounded-pill fw-semibold"
                    onClick={() => handleViewDetails(internship.id)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default InternshipList;
