import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import googleLogo from '../assets/google.png'; // Importer Google-logoen



const allowedEmails = ['hermanhanssen97@gmail.com', 'petterviken97@gmail.com', 'malinskogeng12@gmail.com']; // eposter som har tilgang


const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {  //kjøres når innlogging er vellykket
      try {
        const { access_token } = tokenResponse;
    
        const userInfoResponse = await axios.get(    //henter brukerinformasjon fra Google
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
    
        const user = userInfoResponse.data; //lagger og validerer brukerinformasjonen 
        console.log('User info from Google:', user);
    
        if (!allowedEmails.includes(user.email)) {  //hvis eposten ikke er i listen over tillatte eposter så får ikke brukere tilgang
          alert('Du har ikke tilgang.');
          return;
        }
    
        sessionStorage.setItem('user', JSON.stringify({
          email: user.email,
          name: user.name,
          picture: user.picture,
        }));
    
        window.location.href = '/'; //lagrer brukerinfo i nettleseren slik at andre deler av siden vet at bruker er innlogget
      } catch (error) {
        console.error('Login error:', error);
        alert('Noe gikk galt ved innlogging.');
      }
    }
    ,

    onError: () => {
      alert('Innlogging feilet');
    },
  });

  return (
    <button style={styles.loginButton} onClick={() => login()}>
    <img src={googleLogo} alt="Google Icon" style={styles.icon} />
    <span style={styles.buttonText}>Logg inn med Google</span>
  </button>
  );
};

const styles = {
  loginButton: {
    backgroundColor: 'white',
    color: '#4285F4', // Google Blue color
    border: '1px solid #4285F4', // Blue border
    padding: '12px 25px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '20px', // Rounded corners
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '300px',
    margin: '10px 0',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
  },
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '10px', // Space between icon and text
  },
  buttonText: {
    color: '#4285F4', // Google blue color for text
  },
};

export default GoogleLoginButton;



