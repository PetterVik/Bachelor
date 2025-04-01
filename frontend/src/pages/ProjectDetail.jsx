import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./../styles/ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hent det nåværende prosjektet
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

  // Hent alle prosjekter for å finne lignende prosjekter
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

  if (loading) return <h2>Laster prosjekt...</h2>;
  if (error) return <h2>Feil: {error}</h2>;
  if (!project) return <h2>Prosjekt ikke funnet</h2>;

  // Filtrer ut lignende prosjekter basert på keywords
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
    for (const kw of currentKeywords) {
      if (pKeywords.has(kw)) return true;
    }
    return false;
  });

  return (
    <div className="project-detail">
      {/* Hero-bilde i full bredde */}
      <div className="project-hero">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="hero-image"
        />
      </div>

      {/* Hovedlayout: venstre for innhold, høyre sidebar */}
      <div className="project-body">
        {/* Venstre kolonne med hovedinnhold */}
        <div className="project-left">
          <div className="project-content">
            <h1>{project.title}</h1>

            {project.keywords && (
              <div className="keywords">
                {project.keywords.split(",").map((keyword, index) => (
                  <span key={index} className="keyword-chip">
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Del opp longDescription i avsnitt og rendr <h2> for "Oppdrag" og "Løsning" */}
            {project.longDescription &&
              project.longDescription.split("\n\n").map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (
                  trimmed.startsWith("Oppdrag") ||
                  trimmed.startsWith("Løsning")
                ) {
                  return <h2 key={idx}>{trimmed}</h2>;
                } else {
                  return (
                    <p key={idx}>
                      {paragraph.split("\n").map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  );
                }
              })}
          </div>
        </div>

        {/* Høyre kolonne: Sidebar med lignende prosjekter */}
        <div className="project-sidebar">
          <h3>Lignende prosjekter</h3>
          {similarProjects.length === 0 ? (
            <p>Ingen lignende prosjekter funnet.</p>
          ) : (
            similarProjects.map((sp) => (
              <div key={sp.id} className="sidebar-project-card">
                <Link to={`/projects/${sp.id}`}>
                  <img
                    src={sp.imageUrl}
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
