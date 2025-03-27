import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../styles/ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <h2>Laster prosjekt...</h2>;
  if (error) return <h2>Feil: {error}</h2>;
  if (!project) return <h2>Prosjekt ikke funnet</h2>;

  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      <img src={project.imageUrl} alt={project.title} />

      {project.longDescription &&
        project.longDescription
          // Del opp i avsnitt ved dobbel linjeskift (\n\n)
          .split('\n\n')
          .map((paragraph, idx) => (
            <p key={idx}>
              {/* Del opp i linjer ved enkelt linjeskift (\n) */}
              {paragraph.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          ))
      }
    </div>
  );
};

export default ProjectDetail;
