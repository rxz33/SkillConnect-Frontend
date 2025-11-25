import React, { useState } from "react";
import api from "../services/api";

export default function CreateListing() {
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

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      const res = await api.post("/listings", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Service created successfully!");
      console.log(res.data);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating service");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Add New Service</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Service Description"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Create Listing</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
