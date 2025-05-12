import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectsPage from "./pages/ProjectsPage";  // Importer ProjectsPage
import ProjectDetail from "./pages/ProjectDetail"; // Importer ProjectDetail
import './styles/fullpage.css';
import "./styles/styles.css"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
