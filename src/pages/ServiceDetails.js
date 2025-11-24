import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./ServiceDetails.css";
import { useAuth } from "../context/AuthContext";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const res = await api.get(`/listings/${id}`);
      setService(res.data.listing);
    } catch (err) {
      console.error("Error loading service", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!service) return <div className="loading">Service not found</div>;

  return (
    <div className="service-details">
      <img
        src={
          service.image?.url ||
          "https://via.placeholder.com/350x200?text=No+Image"
        }
        alt=""
        className="service-img"
      />

      <h2>{service.title}</h2>
      <p className="price">₹ {service.price}</p>

      <p className="desc">{service.description}</p>

      {/* Worker Info */}
      <div className="worker-box">
        <h3>Worker Details</h3>
        <p><strong>Name:</strong> {service.owner?.name}</p>
        <p><strong>Email:</strong> {service.owner?.email}</p>
        <p><strong>Experience:</strong> {service.owner?.experience || "Not added"} years</p>
      </div>

      {/* Rating */}
      <div className="rating-box">
        <p><strong>Rating:</strong> ⭐ {service.rating} ({service.reviewCount} reviews)</p>
      </div>

      {/* BOOK BUTTON */}
      {user?.role === "customer" ? (
        <a href={`/book/${service._id}`} className="book-btn">
          Book Service
        </a>
      ) : (
        <p className="note">Only customers can book services.</p>
      )}
    </div>
  );
}
