import React, { useEffect, useState } from "react";
import "./Home.css";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const res = await api.get("/listings");
      setListings(res.data.listings.slice(0, 6)); // show only 6
    } catch (err) {
      console.log("Error loading listings", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="home">
      {/* HERO SECTION */}
      <div className="hero">
        <h1>
          Hire Trusted <span>Service Experts</span> Near You
        </h1>

        <p>AC Repair • Electricians • Plumbers • Carpenters • Cleaners</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to={`/services?search=${search}`}>
            <button>Search</button>
          </Link>
        </div>
      </div>

      {/* CATEGORIES */}
      <h2 className="sec-title">Popular Categories</h2>
      <div className="categories">
        {categories.map((cat) => (
          <div key={cat.title} className="cat-card">
            <img src={cat.img} alt="" />
            <p>{cat.title}</p>
          </div>
        ))}
      </div>

      {/* FEATURED SERVICES */}
      <h2 className="sec-title">Top Services</h2>

      <div className="services-grid">
        {listings.map((item) => (
          <div className="service-card" key={item._id}>
            <img
              src={
                item.image?.url ||
                "https://via.placeholder.com/200?text=No+Image"
              }
              alt=""
            />
            <h3>{item.title}</h3>
            <p className="price">₹ {item.price}</p>
            <Link to={`/service/${item._id}`} className="btn">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Category icons
const categories = [
  { title: "AC Repair", img: "https://i.imgur.com/9V3RnrJ.png" },
  { title: "Plumbing", img: "https://i.imgur.com/WGUBKxN.png" },
  { title: "Electrician", img: "https://i.imgur.com/7dE0tFM.png" },
  { title: "Cleaning", img: "https://i.imgur.com/hY4BQH3.png" },
  { title: "Carpentry", img: "https://i.imgur.com/KyaeD8P.png" },
  { title: "Painting", img: "https://i.imgur.com/26XAYu0.png" },
];
