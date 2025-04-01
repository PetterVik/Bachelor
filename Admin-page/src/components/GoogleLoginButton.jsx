import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const allowedEmails = ['hermanhanssen97@gmail.com', 'petterviken97@gmail.com']; // eposter som har tilgang

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Hent brukerinfo fra Google med access_token
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const user = res.data;
        console.log('✅ Innlogget bruker:', user);

        if (allowedEmails.includes(user.email)) {
          sessionStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/';
        } else {
          alert('Du har ikke tilgang');
        }
      } catch (error) {
        console.error('Feil ved henting av brukerinfo:', error);
        alert('Noe gikk galt ved innlogging.');
      }
    },
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


