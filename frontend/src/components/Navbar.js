import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Ensure correct relative path

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>My Website</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/karriere">Karriere</Link></li>  {/* Fixed the Link path */}
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
