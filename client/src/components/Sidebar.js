import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaRobot, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`sidebar ${isMobile ? 'mobile' : ''} ${isMobile && isOpen ? 'open' : ''}`}>
        <h2>F1 Analytics</h2>
        <Link to="/" className={isActive('/')}>
          <FaTachometerAlt style={{ marginRight: '0.5rem' }} /> Dashboard
        </Link>
        <Link to="/predictor" className={isActive('/predictor')}>
          <FaRobot style={{ marginRight: '0.5rem' }} /> Predictor
        </Link>
      </nav>
    </>
  );
};

export default Sidebar;
