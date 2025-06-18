// src/components/AdminPanel.js
import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Row, Col, Card, Alert, Form, Badge, Spinner } from 'react-bootstrap';
import { FaUsers, FaBuilding, FaClipboardList, FaCheckCircle, FaBell, FaChartBar, FaCheck, FaTimes, FaTrash, FaUserShield, FaGraduationCap, FaCog } from 'react-icons/fa';
import '../styles/AdminPanel.css';
import { AuthContext } from '../context/AuthContext';

function AdminPanel() {
  const { role } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === 'admin') {
      const fetchData = async () => {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        
        try {
          const [usersRes, companiesRes, studentsRes, internshipsRes] = await Promise.all([
            fetch('http://localhost:5000/api/admin/users', {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch('http://localhost:5000/api/admin/companies', {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch('http://localhost:5000/api/admin/students', {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch('http://localhost:5000/api/admin/internships', {
              headers: { 'Authorization': `Bearer ${token}` }
            })
          ]);

          // Check for API errors
          if (!usersRes.ok) {
            throw new Error(`Users API error: ${usersRes.status} ${usersRes.statusText}`);
          }
          if (!companiesRes.ok) {
            throw new Error(`Companies API error: ${companiesRes.status} ${companiesRes.statusText}`);
          }
          if (!studentsRes.ok) {
            throw new Error(`Students API error: ${studentsRes.status} ${studentsRes.statusText}`);
          }
          if (!internshipsRes.ok) {
            throw new Error(`Internships API error: ${internshipsRes.status} ${internshipsRes.statusText}`);
          }

          const [usersData, companiesData, studentsData, internshipsData] = await Promise.all([
            usersRes.json(),
            companiesRes.json(),
            studentsRes.json(),
            internshipsRes.json()
          ]);

          console.log('Admin data loaded:', { usersData, companiesData, studentsData, internshipsData });

          if (Array.isArray(usersData)) setUsers(usersData);
          if (Array.isArray(companiesData)) setCompanies(companiesData);
          if (Array.isArray(studentsData)) setStudents(studentsData);
          if (Array.isArray(internshipsData)) setInternships(internshipsData);
        } catch (err) {
          console.error('Admin panel fetch error:', err);
          setError(`Failed to fetch admin data: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [role]);

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const token = sessionStorage.getItem('token');
    let url = '';
    if (type === 'user') url = `http://localhost:5000/api/admin/users/${id}`;
    if (type === 'company') url = `http://localhost:5000/api/admin/companies/${id}`;
    if (type === 'internship') url = `http://localhost:5000/api/admin/internships/${id}`;
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        if (type === 'user') setUsers(users.filter(u => u.id !== id));
        if (type === 'company') setCompanies(companies.filter(c => c.id !== id));
        if (type === 'internship') setInternships(internships.filter(i => i.id !== id));
      } else {
        setError('Failed to delete.');
      }
    } catch {
      setError('Failed to delete.');
    }
  };

  const handleApproveReject = async (id, action) => {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:5000/api/admin/internships/${id}/${action}`;
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setInternships(internships.map(i => i.id === id ? { ...i, status: action === 'approve' ? 'approved' : 'rejected' } : i));
      } else {
        setError('Failed to update internship status.');
      }
    } catch {
      setError('Failed to update internship status.');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      } else {
        setError('Failed to update user role.');
      }
    } catch {
      setError('Failed to update user role.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge bg="success" className="px-2 py-1">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger" className="px-2 py-1">Rejected</Badge>;
      case 'pending':
        return <Badge bg="warning" className="px-2 py-1">Pending</Badge>;
      default:
        return <Badge bg="secondary" className="px-2 py-1">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    const variants = {
      'admin': 'light',
      'company': 'light',
      'student': 'light'
    };
    const textColors = {
      'admin': 'text-danger',
      'company': 'text-primary',
      'student': 'text-success'
    };
    return (
      <Badge 
        bg={variants[role] || 'light'} 
        className={`px-2 py-1 ${textColors[role] || 'text-muted'}`}
      >
        {role}
      </Badge>
    );
  };

  if (role !== 'admin') {
    return (
      <Container className="py-5 text-center">
        <FaUserShield size={64} className="text-muted mb-3" />
        <h2 className="text-muted">Access Denied</h2>
        <p className="text-muted">You need administrator privileges to access this page.</p>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading admin panel...</p>
      </Container>
    );
  }

  // Debug: Add error display
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            Please check if:
            <br />• You're logged in as an admin user
            <br />• The backend server is running
            <br />• Your network connection is working
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="admin-panel-page">
      {/* Hero Section */}
      <div className="admin-hero bg-gradient text-white py-5">
        <Container>
          <div className="text-center">
            <FaCog size={48} className="mb-3" />
            <h1 className="display-4 fw-bold mb-3">Admin Panel</h1>
            <p className="lead mb-0">Manage users, companies, students, and internships</p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* Statistics Cards */}
        <Row className="g-4 mb-5">
          <Col md={3}>
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <FaUsers size={40} className="text-primary mb-3" />
                <h3 className="fw-bold mb-1">{users.length}</h3>
                <p className="text-muted mb-0">Total Users</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <FaBuilding size={40} className="text-primary mb-3" />
                <h3 className="fw-bold mb-1">{companies.length}</h3>
                <p className="text-muted mb-0">Companies</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <FaGraduationCap size={40} className="text-primary mb-3" />
                <h3 className="fw-bold mb-1">{students.length}</h3>
                <p className="text-muted mb-0">Students</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <FaClipboardList size={40} className="text-primary mb-3" />
                <h3 className="fw-bold mb-1">{internships.length}</h3>
                <p className="text-muted mb-0">Internships</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4 border-0 shadow-sm">
            <FaBell className="me-2" />
            <strong>Error!</strong> {error}
          </Alert>
        )}

        {/* Users Section */}
        <Card className="mb-5 border-0 shadow-sm">
          <Card.Header className="bg-primary text-white py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <FaUsers className="me-2" />
              Registered Users ({users.length})
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0 admin-table">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-bottom">
                      <td className="py-3 px-4 fw-semibold">{user.id}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-2">
                          {getRoleBadge(user.role)}
                          <Form.Select
                            value={user.role}
                            onChange={e => handleRoleChange(user.id, e.target.value)}
                            size="sm"
                            style={{ width: 120 }}
                          >
                            <option value="student">Student</option>
                            <option value="company">Company</option>
                            <option value="admin">Admin</option>
                          </Form.Select>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => handleDelete('user', user.id)}
                          className="d-flex align-items-center gap-1"
                        >
                          <FaTrash size={12} />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Companies Section */}
        <Card className="mb-5 border-0 shadow-sm">
          <Card.Header className="bg-primary text-white py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <FaBuilding className="me-2" />
              Companies ({companies.length})
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0 admin-table">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Industry</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id} className="border-bottom">
                      <td className="py-3 px-4 fw-semibold">{company.id}</td>
                      <td className="py-3 px-4 fw-medium">{company.company_name}</td>
                      <td className="py-3 px-4">{company.user_id}</td>
                      <td className="py-3 px-4">
                        <Badge bg="outline-primary" className="px-2 py-1">
                          {company.industry || 'N/A'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{company.location || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => handleDelete('company', company.id)}
                          className="d-flex align-items-center gap-1"
                        >
                          <FaTrash size={12} />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Students Section */}
        <Card className="mb-5 border-0 shadow-sm">
          <Card.Header className="bg-primary text-white py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <FaGraduationCap className="me-2" />
              Students ({students.length})
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0 admin-table">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">University</th>
                    <th className="py-3 px-4">Major</th>
                    <th className="py-3 px-4">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} className="border-bottom">
                      <td className="py-3 px-4 fw-semibold">{student.id}</td>
                      <td className="py-3 px-4 fw-medium">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="py-3 px-4">{student.user_id}</td>
                      <td className="py-3 px-4">{student.university || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <Badge bg="outline-info" className="px-2 py-1">
                          {student.major || 'N/A'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{student.graduation_year || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Internships Section */}
        <Card className="mb-5 border-0 shadow-sm">
          <Card.Header className="bg-primary text-white py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <FaClipboardList className="me-2" />
              Internships ({internships.length})
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0 admin-table">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map(internship => (
                    <tr key={internship.id} className="border-bottom">
                      <td className="py-3 px-4 fw-semibold">{internship.id}</td>
                      <td className="py-3 px-4 fw-medium">{internship.title}</td>
                      <td className="py-3 px-4">Company #{internship.company_id}</td>
                      <td className="py-3 px-4">{internship.location || 'Remote'}</td>
                      <td className="py-3 px-4">
                        <Badge bg="outline-secondary" className="px-2 py-1">
                          {internship.type || 'Internship'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(internship.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleApproveReject(internship.id, 'approve')}
                            disabled={internship.status === 'approved'}
                            className="px-2"
                            title="Approve"
                          >
                            <FaCheck size={12} />
                          </Button>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleApproveReject(internship.id, 'reject')}
                            disabled={internship.status === 'rejected'}
                            className="px-2"
                            title="Reject"
                          >
                            <FaTimes size={12} />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => handleDelete('internship', internship.id)}
                            className="px-2"
                            title="Delete"
                          >
                            <FaTrash size={12} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AdminPanel;
