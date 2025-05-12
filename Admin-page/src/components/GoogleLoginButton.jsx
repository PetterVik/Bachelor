import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



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
    
    <button onClick={() => login()}>
      Logg inn med Google
    </button>
    
  );
};

export default GoogleLoginButton;



