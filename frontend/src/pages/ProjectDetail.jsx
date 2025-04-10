// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./../styles/ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Henter det nåværende prosjektet
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5123/api/projects/${id}`);
        if (!response.ok) {
          throw new Error("Kunne ikke hente prosjektdata");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Henter alle prosjekter for å finne lignende prosjekter
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5123/api/projects`);
        if (!response.ok) {
          throw new Error("Kunne ikke hente alle prosjekter");
        }
        const data = await response.json();
        setAllProjects(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllProjects();
  }, []);

  // Viser lastemelding, feil eller "ikke funnet"
  if (loading) return <h2>Laster prosjekt...</h2>;
  if (error) return <h2>Feil: {error}</h2>;
  if (!project) return <h2>Prosjekt ikke funnet</h2>;

  // Finne lignende prosjekter basert på felles nøkkelord
  const currentKeywords = new Set(
    (project.keywords || "")
      .split(",")
      .map((keyword) => keyword.trim().toLowerCase())
  );

  const similarProjects = allProjects.filter((p) => {
    if (p.id === project.id) return false;
    const pKeywords = new Set(
      (p.keywords || "")
        .split(",")
        .map((keyword) => keyword.trim().toLowerCase())
    );
    // Returner true hvis de deler minst ett felles nøkkelord
    for (const kw of currentKeywords) {
      if (pKeywords.has(kw)) return true;
    }
    return false;
  });

  // Forsøk å parse longDescription som JSON.
  // Hvis det ikke er gyldig JSON, havner vi i catch-blokken,
  // og da kan vi vise longDescription som ren tekst i stedet.
  let sections = [];
  try {
    if (project.longDescription) {
      sections = JSON.parse(project.longDescription);
    }
  } catch (err) {
    console.error("Feil ved parsing av longDescription:", err);
  }

  return (
    <div className="project-detail">
      {/* Hero-bilde i full bredde */}
      <div className="project-hero">
        <img
          src={`http://localhost:5123${project.imageUrl}`}
          alt={project.title}
          className="hero-image"
        />
      </div>

      {/* Hovedlayout: venstre kolonne for innhold, høyre sidebar */}
      <div className="project-body">
        {/* Venstre side */}
        <div className="project-left">
          <div className="project-content">
            <h1>{project.title}</h1>

            {/* Viser nøkkelord om de finnes */}
            {project.keywords && (
              <div className="keywords">
                {project.keywords.split(",").map((keyword, index) => (
                  <span key={index} className="keyword-chip">
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Hvis sections er en liste (dvs. gyldig JSON), rendrer vi dem én etter én.
               * Hvis det ikke finnes eller ikke er gyldig, viser vi longDescription som tekst. */}
            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div key={index}>
                  {/* Underoverskrift */}
                  <h2>{section.subtitle}</h2>
                  {/* Tekst, med line breaks bevart */}
                  <p style={{ whiteSpace: "pre-line" }}>{section.text}</p>
                </div>
              ))
            ) : (
              <p style={{ whiteSpace: "pre-line" }}>{project.longDescription}</p>
            )}
          </div>
        </div>

        {/* Høyre side (sidebar) */}
        <div className="project-sidebar">
          <h3>Lignende prosjekter</h3>
          {similarProjects.length === 0 ? (
            <p>Ingen lignende prosjekter funnet.</p>
          ) : (
            similarProjects.map((sp) => (
              <div key={sp.id} className="sidebar-project-card">
                <Link to={`/projects/${sp.id}`}>
                  <img
                    src={`http://localhost:5123${sp.imageUrl}`}
                    alt={sp.title}
                    className="sidebar-project-image"
                  />
                  <p>{sp.title}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default ProjectDetail;
