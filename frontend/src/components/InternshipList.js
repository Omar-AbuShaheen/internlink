import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge, Container, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaBriefcase } from 'react-icons/fa';
import '../styles/InternshipList.css';

function InternshipList() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/internships');
        const data = await res.json();
        if (Array.isArray(data)) {
          setInternships(data);
          setFilteredInternships(data);
        } else {
          setError(data.message || 'Failed to fetch internships');
        }
      } catch (err) {
        setError('Failed to fetch internships');
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  useEffect(() => {
    let filtered = internships;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(internship => internship.type === filterType);
    }
    
    setFilteredInternships(filtered);
  }, [searchTerm, filterType, internships]);

  const getUniqueTypes = () => {
    const types = internships.map(internship => internship.type).filter(Boolean);
    return [...new Set(types)];
  };

  if (loading) {
    return (
      <Container className="internship-list py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading internships...</p>
      </Container>
    );
  }

  return (
    <div className="internship-list-page">
      {/* Hero Section */}
      <div className="internship-hero bg-primary text-white py-5">
        <Container>
          <div className="text-center">
            <FaBriefcase size={48} className="mb-3" />
            <h1 className="display-4 fw-bold mb-3">Internship Opportunities</h1>
            <p className="lead mb-0">Discover amazing internship opportunities and launch your career</p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* Search and Filter Section */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <Form.Label className="fw-semibold">Search Internships</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Label className="fw-semibold">Filter by Type</Form.Label>
                <Form.Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {getUniqueTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <div className="text-muted small">
                  <FaFilter className="me-1" />
                  {filteredInternships.length} results
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Error State */}
        {error && (
          <Alert variant="danger" className="text-center">
            <strong>Oops!</strong> {error}
          </Alert>
        )}

        {/* Empty State */}
        {filteredInternships.length === 0 && !error && (
          <Card className="text-center py-5">
            <Card.Body>
              <FaBriefcase size={64} className="text-muted mb-3" />
              <h4 className="text-muted">No internships found</h4>
              <p className="text-muted mb-3">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'No internships are available at the moment'
                }
              </p>
              {(searchTerm || filterType !== 'all') && (
                <Button 
                  variant="outline-primary" 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card.Body>
          </Card>
        )}

        {/* Internships Grid */}
        <Row className="g-4">
          {filteredInternships.map(internship => (
            <Col md={6} lg={4} key={internship.id}>
              <Card className="internship-card h-100 shadow-sm border-0" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <Card.Body className="d-flex flex-column">
                  {/* Header with badges */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg="primary" className="px-3 py-2" style={{ fontSize: '0.75rem' }}>
                      {internship.type || 'Internship'}
                    </Badge>
                    {internship.status && (
                      <Badge 
                        bg={internship.status === 'approved' ? 'success' : 'secondary'} 
                        className="px-2 py-1"
                        style={{ fontSize: '0.7rem' }}
                      >
                        {internship.status}
                      </Badge>
                    )}
                  </div>

                  {/* Title and Company */}
                  <Card.Title className="mb-2 fw-bold" style={{ fontSize: '1.25rem', lineHeight: '1.3' }}>
                    {internship.title}
                  </Card.Title>
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaBuilding className="me-2" size={14} />
                    <span className="fw-medium">{internship.company_name}</span>
                  </div>

                  {/* Location */}
                  <div className="d-flex align-items-center mb-3 text-muted">
                    <FaMapMarkerAlt className="me-2" size={14} />
                    <span>{internship.location || 'Remote/Hybrid'}</span>
                  </div>

                  {/* Description preview */}
                  {internship.description && (
                    <Card.Text className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                      {internship.description.length > 100 
                        ? `${internship.description.substring(0, 100)}...` 
                        : internship.description
                      }
                    </Card.Text>
                  )}

                  {/* Posted date */}
                  {internship.posted_at && (
                    <div className="d-flex align-items-center mb-3 text-muted small">
                      <FaCalendarAlt className="me-2" size={12} />
                      <span>Posted {new Date(internship.posted_at).toLocaleDateString()}</span>
                    </div>
                  )}

                  {/* Action button - pushed to bottom */}
                  <div className="mt-auto">
                    <Link to={`/internships/${internship.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="primary" className="w-100" style={{ fontWeight: '600' }}>
                        View Details & Apply
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default InternshipList;
