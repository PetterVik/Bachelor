import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Make sure the CSS file is correctly imported

const Navbar = ({ isScrolled }) => {
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo-container">
          <h1>Pure Logic</h1>
          <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
      </div>
      <div className="nav-links">
        <ul>
          <li><Link to="/about">Om oss</Link></li>
          <li><Link to="/prosjekter">Prosjekter</Link></li>
          <li><Link to="/karriere">Karriere</Link></li>
          <li><Link to="/contact">Kontakt oss</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
