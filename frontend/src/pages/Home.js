import React, { useEffect, useState } from "react";
import "../styles.css"; // Import global styles

const Home = () => {
  // State to hold data fetched from the backend
  const [message, setMessage] = useState("");

  // useEffect runs when the component mounts
  useEffect(() => {
    fetch("http://localhost:5123/api/example") // Calls the backend API
      .then((response) => response.json()) // Converts the response to JSON
      .then((data) => setMessage(data.message)) // Updates state with received data
      .catch((error) => console.error("Error fetching data:", error)); // Logs errors if any
  }, []);

  return (
    <div className="page-container">
      <h1>Welcome to the Home Page</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
};

export default Home;
