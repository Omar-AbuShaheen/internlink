import React from 'react';
import { Container } from 'react-bootstrap';

function Services() {
  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4">Our Services</h2>
      <p>
        InternLink offers students a platform to discover and apply for exciting internship opportunities. 
        We connect students with top companies, provide resources for career development, 
        and streamline the application process.
      </p>
      <ul>
        <li>Internship Listings</li>
        <li>Resume Review and Tips</li>
        <li>Application Tracking</li>
        <li>Company Profiles</li>
      </ul>
    </Container>
  );
}

export default Services;
