import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = sessionStorage.getItem('user');  //lagrer brukeren hvis brukeren er logget inn

  if (!user) {
    return <Navigate to="/login" replace />; //hvis brukeren ikke er logget inn så blir brukeren sendt til innloggingssiden
  }

  return children;
}

