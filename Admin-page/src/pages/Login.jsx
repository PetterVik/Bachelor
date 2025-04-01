import React from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginPage = () => {
  return (
    <div style={{ margin: "2rem" }}>
      <h2>Admin Login</h2>
      <GoogleLoginButton />
    </div>
  );
};

export { LoginPage };


