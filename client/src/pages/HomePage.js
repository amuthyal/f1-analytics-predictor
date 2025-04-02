import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Predictor from './Predictor';
import LiveRace from './LiveRace';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setIsSidebarOpen(!mobile);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebar on mobile nav
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={`layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={isMobile} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/live" element={<LiveRace />} />
        </Routes>
      </main>
    </div>
  );
};

export default HomePage;
