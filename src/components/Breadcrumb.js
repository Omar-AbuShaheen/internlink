import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path) => {
    switch (path) {
      case 'dashboard':
        return 'Dashboard';
      case 'internships':
        return 'Internships';
      case 'profile':
        return 'Profile';
      case 'about':
        return 'About Us';
      case 'services':
        return 'Services';
      case 'testimonials':
        return 'Testimonials';
      case 'contact':
        return 'Contact';
      default:
        return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li
              key={to}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                getBreadcrumbName(value)
              ) : (
                <Link to={to}>{getBreadcrumbName(value)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 