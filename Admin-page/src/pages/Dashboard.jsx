import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Ensure this is imported correctly
import '../styles/Dashboard.css'; // Ensure this is the correct path to your CSS file

const Dashboard = () => {
  // State to toggle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <h2 classname="overskrift">Prosjektadministrasjon</h2>

        <div className="dashboard-container">
          <div className="input-container">
            <label>Alternativer</label>
            <input
              type="text"
              onClick={toggleDropdown} // Show dropdown when clicked
              placeholder="Hva ønsker du å gjøre?"
              readOnly
            />
            {isDropdownOpen && (
              <ul className="dropdown-list">
                <li>
                {/* Link for "Legg til nytt prosjekt" */}
                <Link to="/add-project">Legg til nytt prosjekt</Link>
              </li>
                <li>
                  <Link to="/edit-project">Rediger prosjekt</Link>
                  </li>
                <li>
                  <Link to="/arkiv">Se arkiv</Link>
                  </li>
              </ul>
            )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
