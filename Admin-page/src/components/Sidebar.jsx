import { Link } from "react-router-dom";

export function Sidebar() { //returnerer Sidebar komponenten
  return (
    <div style={{ //styling av sidebar
      width: "250px", height: "100vh", background: "#1e1e2d", color: "#fff", 
      padding: "20px", display: "flex", flexDirection: "column"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>📊 Dashboard</Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link to="/users" style={{ color: "#fff", textDecoration: "none" }}>👤 Users</Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link to="/settings" style={{ color: "#fff", textDecoration: "none" }}>⚙️ Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
