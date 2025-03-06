import { useState } from 'react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend login API
    // Example:
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (res.ok) {
      // If successful, you'd get a token or user info back
      const data = await res.json();
      // Save token in localStorage, or a global context, etc.
      localStorage.setItem('token', data.token);
      // Then redirect or navigate to your admin dashboard
      window.location.href = '/'; 
    } else {
      // Handle login error (show message, etc.)
      alert('Login failed');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br/>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Password:</label><br/>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

