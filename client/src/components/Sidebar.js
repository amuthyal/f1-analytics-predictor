import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaRobot,
  FaBroadcastTower,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <nav className={`sidebar ${isMobile ? 'mobile' : ''}`}>
          <h2>F1 Analytics</h2>
          <Link to="/" className={isActive('/')}>
            <FaTachometerAlt style={{ marginRight: '0.5rem' }} /> Dashboard
          </Link>
          <Link to="/predictor" className={isActive('/predictor')}>
            <FaRobot style={{ marginRight: '0.5rem' }} /> Predictor
          </Link>
          <Link to="/live" className={isActive('/live')}>
            <FaBroadcastTower style={{ marginRight: '0.5rem' }} /> Live Race
          </Link>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
