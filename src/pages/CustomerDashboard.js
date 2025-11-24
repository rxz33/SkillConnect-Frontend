import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ServicesList from "../components/ServicesList";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings", { withCredentials: true });
      const list = Array.isArray(res.data.bookings) ? res.data.bookings : [];
      const my = list.filter((b) => String(b.customer) === String(user.id));
      setBookings(my);
    } catch (err) {
      console.error("Fetch bookings error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ maxWidth: 1050, margin: "24px auto" }}>
      <h2>Welcome, {user.name}</h2>

      {/* 🔵 Available Services Section */}
      <div style={{ marginTop: 20 }}>
        <h3>Available Services</h3>
        <ServicesList />
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 🔵 Customer Bookings */}
      <h3>My Bookings</h3>

      {loading ? (
        <div>Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <p>No bookings yet. Browse services above to book.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} style={cardStyle}>
            <div>
              <strong>Service:</strong> {b.listing?.title || b.listing}
            </div>
            <div>
              <strong>Worker:</strong> {b.worker?.name || b.worker}
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(b.scheduledDate).toLocaleString()}
            </div>
            <div>
              <strong>Address:</strong> {b.address}
            </div>
            <div>
              <strong>Price:</strong> ₹{b.price}
            </div>
            <div>
              <strong>Status:</strong> {b.status}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #eee",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
  background: "#fff"
};
