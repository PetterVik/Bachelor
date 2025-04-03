import React from "react";
import "../styles/AdminNavbar.css"; // Update your CSS as needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1>Pure Logic Admin</h1>
        <img src="/pure-logic-logo.png" alt="Pure Logic Logo" className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
