import React from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';
import Navbar from '../components/Navbar'; // Import Navbar

const LoginPage = () => {
  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Admin Login</h2>
        <p style={styles.instruction}>Du må logge inn for å få tilgang til prosjektadministrasjonen</p>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#D5EAF9", // Light blue background
  },
  container: {
    backgroundColor: "#FFFFFF", // White background for the login container
    padding: "2rem",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for some depth
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#003366", // Dark blue color for the heading
    fontFamily: "'Exo 2', sans-serif",
  },
  instruction: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#003366", // Dark blue for the instructions
  },
};

export { LoginPage };
