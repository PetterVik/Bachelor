import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css"; // We'll create this CSS file

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    const navLinks = document.getElementById('NavLinks');
    const menuToggle = document.querySelector('.hamburger');

    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo-container">
        <Link to="/admin">
          <h1>Pure Logic Admin</h1>
          <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="NavLinks">
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
