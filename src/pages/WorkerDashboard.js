import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

/*
Worker Dashboard:
 - shows listings owned by worker
 - shows bookings assigned to worker
 - allows changing booking status (accepted/completed)
*/

export default function WorkerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // fetch listings
      const L = await api.get("/listings", { withCredentials: true });
      const allListings = Array.isArray(L.data.listings) ? L.data.listings : L.data.listings || [];
      const myList = allListings.filter((l) => String(l.owner?._id || l.owner) === String(user.id));
      setListings(myList);

      // fetch bookings
      const B = await api.get("/bookings", { withCredentials: true });
      const allB = Array.isArray(B.data.bookings) ? B.data.bookings : B.data.bookings || [];
      const myBookings = allB.filter((b) => String(b.worker) === String(user.id));
      setBookings(myBookings);
    } catch (err) {
      console.error("Fetch worker data error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const updateStatus = async (bookingId, status) => {
    try {
      const res = await api.put(`/bookings/${bookingId}/status`, { status }, { withCredentials: true });
      // update local state
      setBookings((prev) => prev.map((b) => (b._id === bookingId ? res.data.booking : b)));
    } catch (err) {
      console.error("Update booking status error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Could not update status");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading dashboard...</div>;

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto" }}>
      <h2>Worker Dashboard</h2>

      <section style={{ marginBottom: 18 }}>
        <h3>My Services</h3>
        {listings.length === 0 ? <p>No services yet. Create one.</p> :
          listings.map((l) => (
            <div key={l._id} style={cardStyle}>
              <div><strong>{l.title}</strong></div>
              <div>{l.location} • ₹{l.price}</div>
            </div>
          ))
        }
      </section>

      <section>
        <h3>Bookings Received</h3>
        {bookings.length === 0 ? <p>No bookings yet.</p> :
          bookings.map((b) => (
            <div key={b._id} style={cardStyle}>
              <div><strong>Service:</strong> {b.listing?.title || b.listing}</div>
              <div><strong>Customer:</strong> {b.customer?.name || b.customer}</div>
              <div><strong>Date:</strong> {new Date(b.scheduledDate).toLocaleString()}</div>
              <div><strong>Address:</strong> {b.address}</div>
              <div><strong>Status:</strong> {b.status}</div>

              {b.status === "pending" && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => updateStatus(b._id, "accepted")}>Accept</button>
                </div>
              )}

              {b.status === "accepted" && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => updateStatus(b._id, "completed")}>Mark Completed</button>
                </div>
              )}
            </div>
          ))
        }
      </section>
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
