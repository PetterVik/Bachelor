import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../services/api"; // Importing the API function
import "../styles/ProjectsPage.css";

const ProjectsPage = () => {
  // State to hold the projects fetched from the API
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="projects-container">
      <h1>Prosjekter</h1>
      <div className="projects-grid">
        {/* Mapping through the projects array and rendering each project */}
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
