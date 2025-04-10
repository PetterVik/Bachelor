// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'; // Default import (no curly braces)
import { Settings } from './pages/Settings.jsx'; 
import { Sidebar } from './components/Sidebar.jsx';
import { LoginPage } from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AuthProvider from "./auth/AuthProvider";
import AddProject from './pages/AddProject';  // Import AddProject page
import EditProject from './pages/EditProject.jsx';

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

            {/* Add the route for AddProject */}
            <Route
            path="/add-project"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-project"
            element={
              <ProtectedRoute>
                <EditProject />
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
