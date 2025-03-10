import React from "react";
import { useMsal } from "@azure/msal-react";

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
    <div style={{ margin: "2rem" }}>
      <h2>Admin Login</h2>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
};

export { LoginPage };



