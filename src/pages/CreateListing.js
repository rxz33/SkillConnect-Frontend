import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CreateListing() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return setMsg("Please upload an image");
    }

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("price", form.price);
      fd.append("location", form.location);
      fd.append("image", image);

      const res = await api.post("/listings", fd, { withCredentials: true });

      setMsg("Service created successfully!");
      console.log(res.data);

      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        location: "",
      });
      setImage(null);

    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating service");
    }
  };

  if (!user || user.role !== "worker") {
    return <p style={{ padding: 20 }}>Only workers can add services.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Add New Service</h2>

      {msg && (
        <p style={{ 
          background: "#f5f5f5", 
          padding: 10, 
          borderRadius: 6 
        }}>
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Short description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category (Plumber, Electrician...)"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" style={btnStyle}>
          Create Service
        </button>
      </form>
    </div>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const btnStyle = {
  padding: "10px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
};
