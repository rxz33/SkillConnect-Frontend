import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/login", form, { withCredentials: true });

      // ⬇️ Save user in context
      login(res.data.user);

      setMessage("Login successful!");

      // ⬇️ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="auth-msg">{message}</p>}
    </div>
  );
}
