import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../services/api"; // Importing the API function
import "../styles/ProjectsPage.css";

const ProjectsPage = () => {
  // State to hold the projects fetched from the API
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;

  useEffect(() => {
    // Function to fetch projects from the backend API
    const getProjects = async () => {
      try {
        const data = await fetchProjects(); // Calls the API function
        setProjects(data); // Updates the state with the fetched data
      } catch (error) {
        console.error("Error in retrieving the projects", error); // Logs any errors that occur during fetching
      }
    };

    getProjects(); //calling the API
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  // Filter projects based on visibleOnWebsite and the search term
  const filteredProjects = projects
    .filter((project) => {
      // Filter out projects where visibleOnWebsite is not true
      if (!project.visibleOnWebsite) return false;

      // Filter by title, short description, and keywords
      const title = project.title?.toLowerCase() || "";
      const shortDescription = project.shortDescription?.toLowerCase() || "";
      const keywords = project.keywords?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();

      return (
        title.includes(term) ||
        shortDescription.includes(term) ||
        keywords.includes(term)
      );
    })
    .sort((a, b) => {
      const titleA = a.title?.toLowerCase() || "";
      const titleB = b.title?.toLowerCase() || "";
      return titleA.localeCompare(titleB); // Sort alphabetically by title
    });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handler for page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        {/* Only show paginated projects */}
        {currentProjects.length === 0 ? (
          <p>Ingen prosjekter funnet.</p>
        ) : (
          currentProjects.map((project) => (
            <div key={project.id} className="project-card">
              <Link to={`/projects/${project.id}`}>
                <img src={`http://localhost:5123${project.imageUrl}`} alt={project.title} />

                {/* Tittel */}
                <h3>{project.title}</h3>

                {/* Nøkkelord-chips */}
                {project.keywords && (
                  <div className="keywords">
                    {project.keywords.split(',').map((keyword, index) => (
                      <span key={index} className="keyword-chip">
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Beskrivelse */}
                <p>{project.shortDescription}</p>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default ProjectsPage;
