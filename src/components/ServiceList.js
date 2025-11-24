import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./ServicesList.css";

export default function ServicesList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/listings");
        setServices(res.data.listings || []);
      } catch (err) {
        console.error("Error loading services", err);
      }
    }
    load();
  }, []);

  return (
    <div className="services-container">
      {services.length === 0 ? (
        <p>No services available</p>
      ) : (
        services.map((s) => (
          <div className="service-card" key={s._id}>
            <img
              src={
                s.image?.url ||
                "https://via.placeholder.com/150?text=No+Image"
              }
              alt="service"
            />

            <h3>{s.title}</h3>
            <p>{s.description}</p>

            <strong>₹{s.price}</strong>

            <Link className="book-btn" to={`/book/${s._id}`}>
              Book Now
            </Link>
            <Link to={`/service/${service._id}`} className="view-btn">
              View Details
            </Link>
            <Link to={`/worker/${service.owner._id}`}>
              {service.owner.name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
