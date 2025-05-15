import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge, Row, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import '../styles/InternshipDetail.css';

// Reuse the same mock data (later replace with API call)
const mockInternships = [
  { 
    id: 1, 
    title: 'Marketing Intern', 
    company: 'Top Agency', 
    description: 'Help with marketing campaigns and grow your skills.', 
    logo: require('../images/marketing-logo.png'), 
    location: 'New York, NY', 
    type: 'On-site', 
    skills: ['Marketing', 'Communication'],
    requirements: [
      'Currently pursuing a degree in Marketing or related field',
      'Strong communication and writing skills',
      'Experience with social media platforms',
      'Basic knowledge of marketing tools and analytics'
    ],
    responsibilities: [
      'Assist in developing and implementing marketing campaigns',
      'Create and manage social media content',
      'Conduct market research and competitor analysis',
      'Support the marketing team in various projects'
    ]
  },
  { 
    id: 2, 
    title: 'Software Engineer Intern', 
    company: 'Tech Startup', 
    description: 'Join a fast-paced tech team and build awesome products.', 
    logo: require('../images/tech-logo.png'), 
    location: 'Remote', 
    type: 'Remote', 
    skills: ['React', 'JavaScript'],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Strong knowledge of JavaScript and React',
      'Experience with version control (Git)',
      'Understanding of web development principles'
    ],
    responsibilities: [
      'Develop and maintain web applications using React',
      'Collaborate with the team on new features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and team meetings'
    ]
  },
  { 
    id: 3, 
    title: 'Design Intern', 
    company: 'Creative Studio', 
    description: 'Collaborate on creative projects for global brands.', 
    logo: require('../images/design-logo.png'), 
    location: 'Los Angeles, CA', 
    type: 'On-site', 
    skills: ['Design', 'Creativity'],
    requirements: [
      'Currently pursuing a degree in Design or related field',
      'Proficiency in design tools (Adobe Creative Suite)',
      'Strong portfolio showcasing design work',
      'Understanding of design principles and trends'
    ],
    responsibilities: [
      'Create visual designs for various projects',
      'Collaborate with the design team on client projects',
      'Participate in design reviews and feedback sessions',
      'Assist in maintaining brand consistency'
    ]
  },
  { 
    id: 4, 
    title: 'Finance Intern', 
    company: 'Finance Firm', 
    description: 'Support financial analysis and reporting tasks.', 
    logo: require('../images/logo.png'), 
    location: 'Chicago, IL', 
    type: 'Hybrid', 
    skills: ['Finance', 'Excel'],
    requirements: [
      'Currently pursuing a degree in Finance or related field',
      'Strong analytical and problem-solving skills',
      'Proficiency in Excel and financial modeling',
      'Understanding of financial principles and markets'
    ],
    responsibilities: [
      'Assist in financial analysis and reporting',
      'Support the team in data collection and analysis',
      'Help prepare financial presentations and reports',
      'Participate in financial planning and forecasting'
    ]
  },
];

function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const found = mockInternships.find((item) => item.id === parseInt(id));
        if (!found) {
          throw new Error('Internship not found');
        }
        setInternship(found);
      } catch (err) {
        console.error('Error fetching internship:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setApplicationSuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setApplicationSuccess(false);
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error applying:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="internship-detail-container py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading internship details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="internship-detail-container py-5">
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-3">
            <Button as={Link} to="/internships" variant="primary">
              Back to Listings
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="internship-detail-container py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="internship-detail-card shadow-lg">
            <div className="internship-detail-header d-flex align-items-center gap-3 p-4 border-bottom">
              <img 
                src={internship.logo} 
                alt={internship.company} 
                width={64} 
                height={64} 
                className="rounded-circle border bg-white" 
              />
              <div>
                <h3 className="mb-1">{internship.title}</h3>
                <span className="text-muted">
                  <FaBuilding className="me-1" />
                  {internship.company}
                </span>
              </div>
            </div>
            <Card.Body className="p-4">
              <div className="mb-4">
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
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <h5 className="mb-3">Description</h5>
              <Card.Text className="mb-4" style={{ fontSize: '1.1rem' }}>
                {internship.description}
              </Card.Text>

              <h5 className="mb-3">Requirements</h5>
              <ul className="mb-4">
                {internship.requirements.map((req, i) => (
                  <li key={i} className="mb-2">{req}</li>
                ))}
              </ul>

              <h5 className="mb-3">Responsibilities</h5>
              <ul className="mb-4">
                {internship.responsibilities.map((resp, i) => (
                  <li key={i} className="mb-2">{resp}</li>
                ))}
              </ul>

              <div className="d-flex gap-2">
                <Button 
                  variant="success" 
                  size="lg" 
                  className="px-4 rounded-pill fw-semibold"
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply Now
                </Button>
                <Button 
                  as={Link} 
                  to="/internships" 
                  variant="outline-primary" 
                  size="lg" 
                  className="px-4 rounded-pill"
                >
                  Back to Listings
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Apply Modal */}
      <Modal 
        show={showApplyModal} 
        onHide={() => !isApplying && setShowApplyModal(false)}
        centered
      >
        <Modal.Header closeButton={!isApplying}>
          <Modal.Title>Apply for {internship.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {applicationSuccess ? (
            <div className="text-center py-4">
              <FaCheckCircle className="text-success mb-3" size={48} />
              <h4>Application Submitted!</h4>
              <p className="text-muted">Your application has been successfully submitted.</p>
            </div>
          ) : (
            <>
              <p>Are you sure you want to apply for this position?</p>
              <p className="text-muted small">
                Your profile and resume will be shared with {internship.company}.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!applicationSuccess && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setShowApplyModal(false)}
                disabled={isApplying}
              >
                Cancel
              </Button>
              <Button 
                variant="success" 
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default InternshipDetail;
