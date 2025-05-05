import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Sørg for at CSS-filen er korrekt importert

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation(); // Forhindrer at klikk på hamburgeren lukkes av klikk utenfor
    setIsMenuOpen(prevState => !prevState); // Oppdater basert på forrige tilstand
  };

  const handleClickOutside = (event) => {
    const menuToggle = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    if (navLinks && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo-container">
        <Link to="/" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)}>
          <h1>Pure Logic</h1>
          <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
        </Link>
      </div>

      {/* Hamburger Menu for mindre skjermer */}
      <div 
        className={`hamburger ${isMenuOpen ? 'hide' : ''}`} 
        onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navigasjonslenker */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
        <ul>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>Om oss</Link></li>
          <li><Link to="/projects" onClick={() => setIsMenuOpen(false)}>Prosjekter</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Kontakt oss</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
