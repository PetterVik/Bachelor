import { Link } from "react-router-dom";
import React from "react";
import "../styles/ProjectsPage.css";


const ProjectsPage = () => {

    const dummyProjects = [
        {
          id: 1,
          title: "Konseptutvikling: E39, Kryssing av Bjørnafjorden",
          description: "I prosjektet ble byggekostnadene og klima-fotavtrykket redusert med henholdsvis 30 og 50%.",
          image: "/images/bjornafjorden.jpg" 
        },
        {
          id: 2,
          title: "Produktutvikling av BioZEment som alternativ til betong",
          description: "BioZEment er fortsatt under utvikling og målet er å redusere klima-fotavtrykket til betongindustrien med 20%.",
          image: "/images/biozement.jpg" 
        },
        {
          id: 3,
          title: "Virksomhetsrådgivning til Kartverkets Masterplan Matrikkel",
          description: "Arbeidet har resultert i 5 effektive og konkrete tiltak hvor nytteverdien er verdsatt til ca. 300 % høyere enn implementerings-kostnaden.",
          image: "/images/matrikkelen.jpg" 
        }
      ];
      

      return (
        <div className="projects-container">
          <h1>Prosjekter</h1>
          <div className="projects-grid">
            {dummyProjects.map((project) => (
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
    }
export default ProjectsPage;