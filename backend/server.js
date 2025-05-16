const express = require("express");
const cors = require("cors"); //åpner for forespørsler fra React-frontenden
const multer = require("multer"); 

const app = express();
const PORT = 5001;

app.use(cors()); // Tillater frontend å hente data fra backend
app.use(express.json()); // Muliggjør JSON-parsing i requests

const upload = multer({ dest: 'uploads/' }); // Filopplasting gjennom multer som legges i mappen uploads.

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

// API-endepunkt for å oppdatere et spesifikt prosjekt
app.put("/api/projects/:id", upload.single('image'), (req, res) => {
  const projectId = parseInt(req.params.id);
  const updatedProject = req.body;

  if (req.file) {
    updatedProject.image = req.file.path; // Håndter bildeopplasting
  }

  const projectIndex = projects.findIndex((p) => p.id === projectId);

  if (projectIndex === -1) {
    return res.status(404).json({ message: "Prosjekt ikke funnet" });
  }

  projects[projectIndex] = { id: projectId, ...updatedProject };
  res.json(projects[projectIndex]);
});

// API-endepunkt for å slette et prosjekt
app.delete('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const projectIndex = projects.findIndex((p) => p.id === parseInt(projectId));
  
  if (projectIndex === -1) {
    return res.status(404).send('Prosjekt ikke funnet');
  }

  projects.splice(projectIndex, 1);
  res.status(200).send('Prosjekt slettet');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
