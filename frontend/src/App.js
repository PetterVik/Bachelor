import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import About from "./pages/About";
import ProjectsPage from "./pages/ProjectsPage"; // Importerer projects-siden
import Contact from "./pages/Contact";
import Karriere from "./pages/Karriere";  // Importerer karrieresiden
import "./styles.css"; 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/prosjekter" element={<ProjectsPage />} />
        <Route path="/karriere" element={<Karriere />} />  {/* Added Karriere route */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
