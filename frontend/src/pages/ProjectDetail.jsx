import React from "react";
import { useParams } from "react-router-dom";
import "./../styles/ProjectDetail.css";


const dummyProjects = [
  {
    id: 1,
    title: "Konseptutvikling: E39, Kryssing av Bjørnafjorden",
    description: "I prosjektet ble byggekostnadene og klima-fotavtrykket redusert med henholdsvis 30 og 50%.",
    image: "/images/bjornafjorden.jpg",
  },
  {
    id: 2,
    title: "Produktutvikling av BioZEment som alternativ til betong",
    description: "BioZEment er fortsatt under utvikling og målet er å redusere klima-fotavtrykket til betongindustrien med 20%.",
    image: "/images/biozement.jpg",
  },
  {
    id: 3,
    title: "Virksomhetsrådgivning til Kartverkets Masterplan Matrikkel",
    description: "Arbeidet har resultert i 5 effektive og konkrete tiltak hvor nytteverdien er verdsatt til ca. 300 % høyere enn implementerings-kostnaden.",
    image: "/images/matrikkelen.jpg",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = dummyProjects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <h2>Prosjekt ikke funnet</h2>;
  }

  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      <img src={project.image} alt={project.title} />
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
