import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../styles/Arkiv.css";

const Arkiv = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Function to fetch archived projects using Axios
    const getProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5123/api/projects"); // Endpoint for projects
        const archivedProjects = response.data.filter((project) => project.isArchived === true); // Filter archived projects
        console.log("Hentede arkiverte prosjekter:", archivedProjects);
        setProjects(archivedProjects); // Update state with fetched projects
      } catch (error) {
        console.error("Feil ved henting av arkiverte prosjekter:", error);
      }
    };

    getProjects(); // Fetch projects when the component mounts
  }, []);

  // Filter projects based on search term
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
    <div className="projects-container">
      <h1>Arkiv</h1>

      {/* Search bar */}
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

      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default Arkiv;
