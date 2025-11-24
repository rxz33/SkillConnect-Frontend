import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/customer", { withCredentials: true });

      const list = Array.isArray(res.data.bookings) ? res.data.bookings : [];
      setBookings(list);
    } catch (err) {
      console.error("Fetch bookings error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading bookings...</div>;

  return (
    <div style={{ maxWidth: 980, margin: "24px auto" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet. Browse services to book.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #eee",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              background: "#fff",
            }}
          >
            <div><strong>Service:</strong> {b.listing?.title}</div>
            <div><strong>Worker:</strong> {b.worker?.name}</div>
            <div><strong>Date:</strong> {new Date(b.scheduledDate).toLocaleString()}</div>
            <div><strong>Address:</strong> {b.address}</div>
            <div><strong>Price:</strong> ₹{b.price}</div>
            <div><strong>Status:</strong> {b.status}</div>
          </div>
        ))
      )}
    </div>
  );
}
