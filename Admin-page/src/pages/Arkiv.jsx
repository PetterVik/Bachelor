import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'; // Import Navbar
import axios from "axios"; // Import Axios
import "../styles/Arkiv.css";
import '../styles/AddProject.css';
import { useNavigate } from 'react-router-dom';

const Arkiv = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); //lagrer liste over arkvierte prosjekter
  const [searchTerm, setSearchTerm] = useState(""); //søketeksten fra brukeren

  useEffect(() => {
    // Henter arkvierte prosjekter med Axios
    const getProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5123/api/projects"); // Endpoint for projects
        const archivedProjects = response.data; // Filtrerer arkiverte prosjekter
        if (archivedProjects.length === 0) {
          console.log("Ingen arkiverte prosjekter funnet.");
        } else {
          console.log("Hentede arkiverte prosjekter:", archivedProjects);
        }
        setProjects(archivedProjects); // Oppdaterer state med hentede prosjekter
      } catch (error) {
        console.error("Feil ved henting av arkiverte prosjekter:", error);
      }
    };

    getProjects(); // Kaller funksjonen for å hente prosjekter
  }, []);


  // Filtrerer basert på søket til bruker
  const filteredProjects = projects.filter((project) => {
    const title = project.title?.toLowerCase() || "";
    const shortDescription = project.shortDescription?.toLowerCase() || "";
    const keywords = project.keywords?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return (
      title.includes(term) || 
      shortDescription.includes(term) ||
      keywords.includes(term)
    );
  });


  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Navbar /> {/* Navbar komponenten */}

      <div className="back-button-container">
        <button onClick={() => navigate('/dashboard')} className="tilbake-knapp">
          Tilbake til Dashboard
        </button>
      </div>

      <div className="projects-container">
        <h1>Arkiv</h1>

        {/* Search bar for filtrering av prosjekter */}
        <div className="search-bar">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Søk i arkivet..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="projects-grid">
          {/* Mapping through the archived projects and rendering each one */}
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <Link to={`/projects/${project.id}`}>
                <img src={`http://localhost:5123${project.imageUrl}`} alt={project.title} />
                <h3>{project.title}</h3>
                {project.keywords && (
                  <div className="keywords">
                    {project.keywords.split(',').map((keyword, index) => (
                      <span key={index} className="keyword-chip">
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <p>{project.shortDescription}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Arkiv;
