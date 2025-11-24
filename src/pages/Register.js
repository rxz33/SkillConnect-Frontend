// import { useState } from "react";
// import api from "../services/api";
// import "./Auth.css";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "customer",
//   });

//   const [message, setMessage] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/register", form);
//       setMessage("Registration successful!");
//       console.log(res.data);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error");
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h2>Create Account</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <select name="role" onChange={handleChange}>
//           <option value="customer">Customer</option>
//           <option value="worker">Worker</option>
//         </select>

//         <button type="submit">Register</button>
//       </form>

//       {message && <p className="auth-msg">{message}</p>}
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const [error, setError] = useState("");  // <-- error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset

    try {
      const res = await axios.post(
        "https://skillconnect-backend-u3a9.onrender.com/api/auth/register",
        formData,
        { withCredentials: true }
      );

      alert("Registered Successfully!");
      console.log(res.data);

    } catch (err) {
      console.log(err);

      // BACKEND ERROR HANDLING
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);    // Show meaningful message
      } else {
        setError("Something went wrong, try again!");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {/* SHOW ERROR */}
      {error && <p className="error-box">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

