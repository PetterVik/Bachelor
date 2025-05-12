import React from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';
import '../styles/Login.css'; // Importer den nye CSS-filen
import logo from '../assets/logo.png';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1 className="prosjekt-heading">Prosjektadministrasjon</h1>
          <div className="loginContainer">
            <p className="instruction">Du må logge inn for å få tilgang til prosjektadministrasjonen</p>
          <div className="identityContainer">
            <p>Din tilhørighet</p>
            <img src={logo} alt="Pure Logic Logo" className="logo" />
        </div>
          <GoogleLoginButton />
        </div>
    </div>
  );
};

export { LoginPage };


