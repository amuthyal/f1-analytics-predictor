import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Predictor from './Predictor';
import '../styles/HomePage.css';
import '../styles/Sidebar.css'; // Ensure Sidebar CSS imported here too

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setIsSidebarOpen(!mobile);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebar when route changes (on mobile)
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={`layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
  <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={isMobile} />

  {isMobile && isSidebarOpen && (
    <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
  )}

  <main className="content">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/predictor" element={<Predictor />} />
    </Routes>
  </main>
</div>

  );
};

export default HomePage;
