import React from "react"; //importere react
import GoogleLoginButton from '../components/GoogleLoginButton'; //importere GoogleLoginButton komponenten

const LoginPage = () => {  // definerer react-komponenten LoginPage
  return ( 
    <div style={{ margin: "2rem" }}> 
      <h2>Admin Login</h2>
      <GoogleLoginButton />  {/* Viser loginknappen */}
    </div>
  );
};

export { LoginPage }; //eskporterer LoginPage komponenten


