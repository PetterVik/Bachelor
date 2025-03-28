import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // For example, check if there's a token in localStorage:
  const token = localStorage.getItem('token');

  // If no token, redirect to /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected page
  return children;
}
