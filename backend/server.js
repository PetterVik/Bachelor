const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors()); // Tillater frontend å hente data fra backend
app.use(express.json()); // Muliggjør JSON-parsing i requests

// Dummy data (skal erstattes med database senere)
const projects = [
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

// API-endepunkt for å hente alle prosjekter
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// API-endepunkt for å hente et spesifikt prosjekt
app.get("/api/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ message: "Prosjekt ikke funnet" });
  }

  res.json(project);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
