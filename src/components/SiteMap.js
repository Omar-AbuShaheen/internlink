import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaUser, FaBuilding, FaClipboardList, FaPlus, FaCogs, FaInfoCircle, FaUserShield, FaMap } from 'react-icons/fa';

const pages = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/login', label: 'Login', icon: <FaSignInAlt /> },
  { path: '/register', label: 'Register', icon: <FaUserPlus /> },
  { path: '/profile', label: 'Profile Page', icon: <FaUser /> },
  { path: '/student/dashboard', label: 'Student Dashboard', icon: <FaClipboardList /> },
  { path: '/company/dashboard', label: 'Company Dashboard', icon: <FaBuilding /> },
  { path: '/company/dashboard/post-job', label: 'Post Internship', icon: <FaPlus /> },
  { path: '/internships', label: 'Internship List', icon: <FaClipboardList /> },
  { path: '/internships/1', label: 'Internship Detail (example)', icon: <FaClipboardList /> },
  { path: '/services', label: 'Services', icon: <FaCogs /> },
  { path: '/about', label: 'About Us', icon: <FaInfoCircle /> },
  { path: '/admin', label: 'Admin Panel', icon: <FaUserShield /> },
];

function SiteMap() {
  return (
    <Container className="py-5">
      <Card className="shadow-lg p-4">
        <h3 className="mb-4 text-primary"><FaMap className="me-2" />Site Map</h3>
        <ListGroup variant="flush">
          {pages.map((page) => (
            <ListGroup.Item key={page.path} className="d-flex align-items-center">
              <span className="me-3 fs-5">{page.icon}</span>
              <Link to={page.path} className="text-decoration-none fw-semibold">
                {page.label}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default SiteMap; 