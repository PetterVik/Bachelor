import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

// Define a functional component for the navigation bar
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Website logo/title */}
      <h2 style={styles.logo}>My Website</h2>

      {/* Navigation links */}
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>About</Link>
        </li>
        <li>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

// Define inline CSS styles as a JavaScript object
const styles = {
  navbar: { 
    display: "flex", 
    justifyContent: "space-between", 
    padding: "15px", 
    background: "#333", 
    color: "white" 
  },
  logo: { margin: 0 }, // Style for the website logo/title
  navLinks: { listStyle: "none", display: "flex", gap: "15px" }, // Style for navigation links
  link: { color: "white", textDecoration: "none", fontSize: "18px" } // Style for link text
};

// Export the Navbar component to be used in other files
export default Navbar;
