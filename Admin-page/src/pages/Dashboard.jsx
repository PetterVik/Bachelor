import React, { useState } from 'react'; // Import React og useState
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar'; // Import Navbar komponenten
import '../styles/Dashboard.css'; // Importere CSS for styling

const Dashboard = () => {
  // Boolean state som håndterer om dropdown er åpen eller lukket
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return ( //retunerer dashboardet
    <div className="dashboard">
      <Navbar />
      
      <h2>Prosjektadministrasjon</h2>

        <div className="container">
          <div className="input-container">
            <label>Alternativer</label>
            <input
              type="text"
              onClick={toggleDropdown} // Vis dropdown når trykket på
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
