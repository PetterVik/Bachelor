import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../services/api"; // Importing the API-function
import "../styles/ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);
  
  return (
    <div className="projects-container">
      <h1>Prosjekter</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/projects/${project.id}`}>
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
