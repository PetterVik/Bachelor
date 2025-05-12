import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'; // Import Navbar
import axios from "axios"; // Import Axios
import "../styles/Arkiv.css";
import { useNavigate } from 'react-router-dom';

const Arkiv = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); // lagrer liste over arkvierte prosjekter
  const [searchTerm, setSearchTerm] = useState(""); // søketeksten fra brukeren
  const [currentPage, setCurrentPage] = useState(1); // side nummer
  const [projectsPerPage] = useState(6); // antall prosjekter per side
  const [totalPages, setTotalPages] = useState(0); // total antall sider
  const [isLoading, setIsLoading] = useState(true); // loading state

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
        setTotalPages(Math.ceil(archivedProjects.length / projectsPerPage)); // Beregn total antall sider
        setIsLoading(false); // Sett loading til false når data er hentet
      } catch (error) {
        console.error("Feil ved henting av arkiverte prosjekter:", error);
        setIsLoading(false); // Sett loading til false selv om det er feil
      }
    };

    getProjects(); // Kaller funksjonen for å hente prosjekter
  }, []);

  // Filtrering av prosjektene basert på søket
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

  // Bestem hvilke prosjekter som skal vises på nåværende side
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Håndter endring av søketekst
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Håndter forrige side
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Håndter neste side
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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

        {/* Hvis dataene er under lasting, vis en lasteskjerm */}
        {isLoading ? (
          <div className="loading">Laster prosjekter...</div>
        ) : (
          <>
            <div className="projects-grid">
              {/* Mapping through the archived projects and rendering each one */}
              {currentProjects.map((project) => (
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

            {/* Paginering */}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Forrige
              </button>
              <span>Side {currentPage} av {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Neste
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Arkiv;
