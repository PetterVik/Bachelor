import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../services/api"; // Importing the API function
import "../styles/ProjectsPage.css";

const ProjectsPage = () => {
  // State to hold the projects fetched from the API
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Function to fetch projects from the backend API
    const getProjects = async () => {
      try {
        const data = await fetchProjects(); // Calls the API function
        console.log("Hentede prosjekter:", data); // Checking if data get fetched 
        setProjects(data); // Updates the state with the fetched data
      } catch (error) {
        console.error("Error in retrieving the projects", error); // Logs any errors that occur during fetching
      }
    };

    getProjects(); //calling the API
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  // Filter projects based on visibleOnWebsite and the search term
  const filteredProjects = projects.filter((project) => {
    // Først, filtrer bort prosjekter der visibleOnWebsite ikke er true
    if (!project.visibleOnWebsite) return false;

    // Deretter filtrer på tittel, kort beskrivelse og nøkkelord
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
    <div className="projects-container">
      <h1>Prosjekter</h1>

      {/* Search bar */}
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Søk her..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="projects-grid">
        {/* Mapping through the projects array and rendering each project */}
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/projects/${project.id}`}>
              {/* Endret linjen nedenfor for å hente bildet fra backend */}
              <img src={`http://localhost:5123${project.imageUrl}`} alt={project.title} />

              {/* Tittel */}
              <h3>{project.title}</h3>

              {/* Nøkkelord-chips (flyttet hit) */}
              {project.keywords && (
                <div className="keywords">
                  {project.keywords.split(',').map((keyword, index) => (
                    <span key={index} className="keyword-chip">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Beskrivelse under nøkkelord */}
              <p>{project.shortDescription}</p>
            </Link>
          </div>
        ))}
      </div>
      {/* Footer Section inside Section 5 */}
      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default ProjectsPage;
