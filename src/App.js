import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './styles/custom.css';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import InternshipList from './components/InternshipList';
import InternshipDetail from './components/InternshipDetail';
import StudentDashboard from './components/StudentDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import AdminPanel from './components/AdminPanel';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import PostInternshipForm from './components/PostInternshipForm';
import SiteMap from './components/SiteMap';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ApplicantsList from './components/ApplicantsList';
import EditInternshipForm from './components/EditInternshipForm';
import StudentProfile from './components/StudentProfile';
import CompanyProfile from './components/CompanyProfile';


<h1>Welcome to InternLink "Omar Abu Shaheen "</h1>

// to Hidden the footer on the login and register page
const AppContent = () => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/internships" element={<InternshipList />} />
        <Route path="/internships/:id" element={<InternshipDetail />} />
        <Route path="/internships/:id/applicants" element={<ApplicantsList />} />
        <Route path="/internships/:id/edit" element={<EditInternshipForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/company/dashboard/post-job" element={<PostInternshipForm />} />
        <Route path="/post-internship" element={<PostInternshipForm />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/company/profile" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyProfile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
