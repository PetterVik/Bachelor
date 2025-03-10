export const msalConfig = {
    auth: {
      clientId: "YOUR_CLIENT_ID", // Bytt ut med ekte Client ID fra Azure når vi får tilgang
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "http://localhost:5173", // Vite bruker denne porten
    },
    cache: {
      cacheLocation: "sessionStorage", // Alternativ: "localStorage"
      storeAuthStateInCookie: false,
    }
  };
  
  export const loginRequest = {
    scopes: ["openid", "profile", "email"], // Tilgang til brukerens navn, e-post osv.
  };
  