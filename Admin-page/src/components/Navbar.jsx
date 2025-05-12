//importerer nødvendige biblioteker og komponenter
import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminNavbar.css"; 
import logo from '../assets/pure-logic-logo.png';  


const Navbar = () => {
  return ( //returnerer navbar
    <nav className="navbar">
      <div className="logo-container">
      <Link to="/" className="logo-link">
          <h1>Pure Logic</h1>
      </Link>
          <img src={logo} alt="Pure Logic Logo" className="logo" />
          <h2>Administrasjon</h2>
      </div>
    </nav>
  );
};

export default Navbar;
