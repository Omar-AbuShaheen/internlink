// src/components/AdminPanel.js
import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const mockUsers = [
  { id: 1, name: 'Ali Hossam', role: 'Student', email: 'ali@example.com' },
  { id: 2, name: 'Osama Salem', role: 'Company', email: 'osama@company.com' },
];

const mockInternships = [
  { id: 1, title: 'Frontend Intern', postedBy: 'Osama Salem' },
  { id: 2, title: 'Marketing Intern', postedBy: 'Ali Hossam' },
];

function AdminPanel() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">⚙️ Admin Panel</h2>

      <h4 className="mt-4 mb-3">👥 Registered Users</h4>
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
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
