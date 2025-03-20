import React from "react";
import { useMsal } from "@azure/msal-react";
import "../styles/LoginPage.css"; 
import logo from "../assets/logo.png";
import micro from "../assets/microsoft.png";
import logo1 from "../assets/pure-logic-logo.png";

const LoginPage = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup().then(response => {
            console.log("User Info:", response.account);

            // Lagre brukerinfo i sessionStorage
            sessionStorage.setItem("user", JSON.stringify(response.account));

            // Redirect til dashboard
            window.location.href = "/";
        }).catch(error => console.error(error));
    };

    return (
      <div>
          <nav className="simple-navbar">
            <div className="logo-container">
              Pure Logic
              <img src={logo1} alt="Pure Logic Logo" className="logo-icon" />
            </div>
          </nav>
        <div className="login-container">
            <h2 className="heading">Prosjektadministrasjon</h2>
            <div className="login-box">
                <h3 className="login-via">Logg inn via Feide</h3>
                <p className="login-text">Du må logge inn for å få tilgang til prosjektadministrasjonen</p>
                <div className="divider"></div>
                <p className="affiliation">Din tilhørighet</p>
                <div className="logo-container">
                  <img
                    src={logo}
                    alt="Pure Logic Logo"
                    className="logo"
                  />
                </div>
                <div className="divider"></div>
                <button onClick={handleLogin} className="login-button">
                  <img src={micro} alt="Microsoft Logo" className="microsoft-logo" />
                    Logg inn her via arbeidskonto
                </button>
            </div>
        </div>
      </div>
    );
};

export { LoginPage };