// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.jsx';
import { Settings } from './pages/Settings.jsx'; // <-- Named import
import { Sidebar } from './components/Sidebar.jsx';
import { LoginPage } from './pages/Login.jsx';
import { Navbar } from './components/Navbar.jsx'; // This one has a default export
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AuthProvider from "./auth/AuthProvider";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route for login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
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


