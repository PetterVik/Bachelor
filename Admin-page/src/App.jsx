// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.jsx';
import { Settings } from './pages/Settings.jsx'; 
import { Sidebar } from './components/Sidebar.jsx';
import { LoginPage } from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AuthProvider from "./auth/AuthProvider";


function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
  {/* Public route for login */}
  <Route path="/login" element={<LoginPage />} />

  {/* Default/dashboard route */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  {/* Other protected routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/settings"
    element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    }
  />
</Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;


