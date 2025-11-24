import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

/*
Customer Dashboard:
 - shows bookings made by the logged-in customer
*/

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings", { withCredentials: true });
      // backend might return all bookings; filter client-side for safety
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
    // eslint-disable-next-line
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading bookings...</div>;

  return (
    <div style={{ maxWidth: 980, margin: "24px auto" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet. Browse services to book.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} style={cardStyle}>
            <div>
              <strong>Service:</strong> {b.listing?.title || b.listing}
            </div>
            <div><strong>Worker:</strong> {b.worker?.name || b.worker}</div>
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

const cardStyle = {
  border: "1px solid #eee",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
  background: "#fff"
};
