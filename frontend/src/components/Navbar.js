import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Sørg for at CSS-filen er korrekt importert

const Navbar = ({ isScrolled }) => {
  // Bruk state for å kontrollere om menyen er åpen
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funksjon for å toggle menyen
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funksjon for å lukke menyen hvis man klikker utenfor
  const handleClickOutside = (event) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.hamburger');

    // Sjekk om klikket er utenfor menyen og hamburger-ikonet
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      setIsMenuOpen(false); // Lukk menyen hvis klikket er utenfor
    }
  };

  // Legg til event listener på mount og fjern den på unmount
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    // Rydd opp event listeneren når komponenten unmountes
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo-container">
        <Link to="/">
          <h1>Pure Logic</h1>
          <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
        </Link>
      </div>

      {/* Hamburger-menyen */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navigasjonslenker */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
        <ul>
          <li><Link to="/about">Om oss</Link></li>
          <li><Link to="/prosjekter">Prosjekter</Link></li>
          <li><Link to="/contact">Kontakt oss</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
