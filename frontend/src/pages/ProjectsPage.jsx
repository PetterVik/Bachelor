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

  // Filter projects based on the search term
  const filteredProjects = projects.filter((project) => {
    // Convert to lowercase for case-insensitive matching
    const title = project.title.toLowerCase();
    const description = project.description.toLowerCase();
    const term = searchTerm.toLowerCase();

    // Match if the search term is included in title OR description
    return title.includes(term) || description.includes(term);
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
              <img src={project.imageUrl} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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
