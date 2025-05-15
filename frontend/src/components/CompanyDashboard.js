import React from 'react';
import { Card, Button, Row, Col, Container, Badge, Alert } from 'react-bootstrap';
import { FaClipboardList, FaCheckCircle, FaTimesCircle, FaUserPlus, FaBell, FaBuilding, FaUserTie, FaPlus, FaUsers, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import '../styles/CompanyDashboard.css';

const mockListings = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    description: 'Looking for a React intern to join our UI team.',
    deadline: '2025-06-30',
    applicants: 5,
    status: 'Active',
  },
  {
    id: 2,
    title: 'Business Analyst Intern',
    description: 'Assist with client and market research.',
    deadline: '2025-07-10',
    applicants: 2,
    status: 'Closed',
  },
];

const mockApplications = [
  { id: 1, student: 'Omar Abu Shaheen', internship: 'Frontend Developer Intern', status: 'Under Review', date: '2024-06-01' },
  { id: 2, student: 'Ali Hossam', internship: 'Business Analyst Intern', status: 'Accepted', date: '2024-05-28' },
];

const mockInterviews = [
  { id: 1, candidate: 'Omar Abu Shaheen', position: 'Frontend Developer Intern', date: '2024-06-20', time: '11:00 AM', type: 'Virtual' },
  { id: 2, candidate: 'Ali Hossam', position: 'Business Analyst Intern', date: '2024-06-22', time: '2:00 PM', type: 'On-site' },
];

function CompanyDashboard() {
  const stats = [
    { label: 'Total Postings', value: 8, icon: <FaClipboardList />, color: 'primary' },
    { label: 'Active', value: 5, icon: <FaCheckCircle />, color: 'success' },
    { label: 'Closed', value: 3, icon: <FaTimesCircle />, color: 'secondary' },
    { label: 'Applicants', value: 23, icon: <FaUserPlus />, color: 'info' },
  ];
  const notifications = [
    { id: 1, message: 'You have 3 new applicants for Frontend Developer Intern.', type: 'info' },
    { id: 2, message: 'Business Analyst Intern listing closed.', type: 'secondary' },
  ];

  // Placeholder handlers
  const handlePostNew = () => alert('Post New Internship clicked!');
  const handleViewApplicants = () => alert('View Applicants clicked!');
  const handleEditProfile = () => alert('Edit Company Profile clicked!');
  const handleEditListing = (id) => alert(`Edit listing ${id}`);
  const handleDeleteListing = (id) => alert(`Delete listing ${id}`);
  const handleViewProfile = (student) => alert(`View profile of ${student}`);
  const handleMessage = (student) => alert(`Message to ${student}`);

  return (
    <Container className="company-dashboard py-4">
      <div className="d-flex align-items-center mb-3">
        <img
          src="https://ui-avatars.com/api/?name=Techify&background=0d6efd&color=fff&rounded=true&size=48"
          alt="Company Logo"
          width={48}
          height={48}
          className="me-3 border border-primary bg-white rounded-circle shadow-sm"
        />
        <h2 className="mb-0">🏢 Welcome, <span className="text-primary">Techify</span>!</h2>
      </div>

      {/* Quick Actions */}
      <Card className="mb-4 shadow-sm p-3 border-0 bg-light">
        <Row className="g-2 align-items-center">
          <Col md={4} sm={12} className="mb-2 mb-md-0">
            <Button variant="primary" className="w-100" onClick={handlePostNew}>
              <FaPlus className="me-2" /> Post New Internship
            </Button>
          </Col>
          <Col md={4} sm={12} className="mb-2 mb-md-0">
            <Button variant="info" className="w-100 text-white" onClick={handleViewApplicants}>
              <FaUsers className="me-2" /> View Applicants
            </Button>
          </Col>
          <Col md={4} sm={12}>
            <Button variant="outline-dark" className="w-100" onClick={handleEditProfile}>
              <FaEdit className="me-2" /> Edit Company Profile
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        {stats.map((stat, i) => (
          <Col md={3} sm={6} xs={12} key={i}>
            <Card className={`stat-card border-${stat.color} text-center shadow-sm`}>
              <Card.Body>
                <div className={`stat-icon text-${stat.color} mb-2`}>{stat.icon}</div>
                <h3 className={`text-${stat.color}`}>{stat.value}</h3>
                <div className="stat-label small text-muted">{stat.label}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Upcoming Interviews */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h5 className="mb-3"><FaCalendarAlt className="me-2 text-primary" />Upcoming Interviews</h5>
          {mockInterviews.length === 0 ? (
            <div className="text-muted">No upcoming interviews.</div>
          ) : (
            <Row>
              {mockInterviews.map((interview) => (
                <Col md={6} key={interview.id} className="mb-2">
                  <Card className="h-100 border-info">
                    <Card.Body>
                      <div className="fw-bold mb-1">{interview.candidate}</div>
                      <div className="text-muted mb-1">{interview.position}</div>
                      <div className="mb-1"><FaCalendarAlt className="me-1 text-info" /> {interview.date} at {interview.time}</div>
                      <div className="mb-1"><Badge bg={interview.type === 'Virtual' ? 'info' : 'secondary'}>{interview.type}</Badge></div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Notifications */}
      {notifications.map((note) => (
        <Alert key={note.id} variant={note.type} className="d-flex align-items-center">
          <FaBell className="me-2" /> {note.message}
        </Alert>
      ))}

      {/* My Internship Listings */}
      <h4 className="mb-3">📋 My Internship Listings</h4>
      <Row className="mb-5">
        {mockListings.map((item) => (
          <Col md={6} key={item.id} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{item.title} <Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className="ms-2">{item.status}</Badge></Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="text-muted">Deadline: {item.deadline}</Card.Text>
                <Card.Text><FaUserPlus className="me-1 text-info" /> {item.applicants} Applicants</Card.Text>
                <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditListing(item.id)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteListing(item.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Applications Received */}
      <h4 className="mb-3">📝 Applications Received</h4>
      <Row>
        {mockApplications.length === 0 ? (
          <Col className="text-muted">No applications received yet.</Col>
        ) : (
          mockApplications.map((app) => (
            <Col md={6} key={app.id} className="mb-3">
              <Card className="h-100 border-info">
                <Card.Body>
                  <Card.Title><FaUserTie className="me-2 text-primary" />{app.student}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{app.internship}</Card.Subtitle>
                  <Card.Text>
                    Status: <Badge bg={app.status === 'Accepted' ? 'success' : app.status === 'Under Review' ? 'info' : 'secondary'}>{app.status}</Badge>
                    <span className="ms-3 text-muted small">{app.date}</span>
                  </Card.Text>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleViewProfile(app.student)}>View Profile</Button>
                  <Button variant="outline-success" size="sm" onClick={() => handleMessage(app.student)}>Message</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default CompanyDashboard;
