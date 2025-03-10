import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    // Remove the token (or whatever key you used to store auth info)
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  }

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      {/* Example links */}
      <Link to="/">Home</Link>
      <Link to="/settings" style={{ marginLeft: '1rem' }}>Settings</Link>

      {/* Logout button */}
      <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
        Logout
      </button>
    </nav>
  );
}

  