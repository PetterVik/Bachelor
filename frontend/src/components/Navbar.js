import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "../styles.css"; // Sørg for at CSS-filen er riktig importert
=======
import "../styles.css"; // Make sure the CSS file is correctly imported
>>>>>>> about-us

const Navbar = ({ isScrolled }) => {
  return (
<<<<<<< HEAD
    <nav className="navbar">
      <div className="logo-container">
      <h1>Pure Logic</h1>
        <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
=======
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo-container">
          <h1>Pure Logic</h1>
          <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
>>>>>>> about-us
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
