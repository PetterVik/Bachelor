import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./pages/Home"; // Import the Home page
import About from "./pages/About"; // Import the About page
import Contact from "./pages/Contact"; // Import the Contact page

// Define the App component that will handle routing
const App = () => {
  return (
    <Router>
      {/* The Navbar will always be visible on all pages */}
      <Navbar />

      {/* Define different routes */}
      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the About page */}
        <Route path="/about" element={<About />} />

        {/* Route for the Contact page */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

// Export the App component
export default App;
