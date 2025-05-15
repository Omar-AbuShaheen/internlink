import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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






function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/internships" element={<InternshipList />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/register" element={<RegisterForm />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
