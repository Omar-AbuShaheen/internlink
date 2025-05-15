// src/components/AdminPanel.js
import React from 'react';
import { Container, Table, Button, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { FaUsers, FaBuilding, FaClipboardList, FaCheckCircle, FaBell, FaChartBar } from 'react-icons/fa';
import '../styles/AdminPanel.css';

const mockUsers = [
  { id: 1, name: 'Ali Hossam', role: 'Student', email: 'ali@example.com' },
  { id: 2, name: 'Osama Salem', role: 'Company', email: 'osama@company.com' },
];

const mockInternships = [
  { id: 1, title: 'Frontend Intern', postedBy: 'Osama Salem' },
  { id: 2, title: 'Marketing Intern', postedBy: 'Ali Hossam' },
];

const mockActivity = [
  { id: 1, type: 'user', message: 'New student registered: Sara Ahmed', time: '2 min ago' },
  { id: 2, type: 'internship', message: 'New internship posted: Backend Intern', time: '10 min ago' },
];

function AdminPanel() {
  const stats = [
    { label: 'Users', value: 120, icon: <FaUsers />, color: 'primary' },
    { label: 'Companies', value: 15, icon: <FaBuilding />, color: 'info' },
    { label: 'Internships', value: 32, icon: <FaClipboardList />, color: 'success' },
    { label: 'Applications', value: 87, icon: <FaCheckCircle />, color: 'warning' },
  ];
  const notifications = [
    { id: 1, message: '3 new users registered today.', type: 'info' },
    { id: 2, message: '2 internships pending approval.', type: 'warning' },
  ];

  return (
    <Container className="admin-panel py-4">
      <h2 className="mb-4">⚙️ Admin Panel</h2>

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

      {/* Notifications */}
      {notifications.map((note) => (
        <Alert key={note.id} variant={note.type} className="d-flex align-items-center">
          <FaBell className="me-2" /> {note.message}
        </Alert>
      ))}

      {/* Quick Actions */}
      <div className="d-flex justify-content-end mb-4 gap-2">
        <Button variant="primary">Send Announcement</Button>
        <Button variant="outline-success">Approve All</Button>
      </div>

      {/* Recent Activity */}
      <h4 className="mb-3">🕒 Recent Activity</h4>
      <Row className="mb-5">
        {mockActivity.map((act) => (
          <Col md={6} key={act.id} className="mb-3">
            <Card className="h-100 border-info">
              <Card.Body>
                <Card.Title>
                  <FaChartBar className="me-2 text-primary" />{act.message}
                </Card.Title>
                <Card.Text className="text-muted small">{act.time}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Registered Users */}
      <h4 className="mb-3">👥 Registered Users</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td><Badge bg={user.role === 'Student' ? 'primary' : 'info'}>{user.role}</Badge></td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Internship Listings */}
      <h4 className="mt-5 mb-3">📄 Internship Listings</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Posted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockInternships.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.postedBy}</td>
              <td>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPanel;
