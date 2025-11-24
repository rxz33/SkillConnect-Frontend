import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout request failed:", err?.response?.data || err);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="nav">
      <h2 className="logo">SkillConnect</h2>

      <div className="links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <span className="welcome">Hi, {user.name}</span>

            {user.role === "worker" && <Link to="/create-listing">Add Service</Link>}

            <Link to="/dashboard">Dashboard</Link>

            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
