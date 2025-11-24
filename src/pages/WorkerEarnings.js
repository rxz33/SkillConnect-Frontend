import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function WorkerEarnings() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get("/earnings", { withCredentials: true });
        setData(res.data);
      } catch (err) {
        console.error("Earnings fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading earnings...</div>;
  if (!data) return <div>Error loading data</div>;

  return (
    <div style={container}>
      <h2>Earnings Dashboard</h2>

      <div style={statsRow}>
        <div style={card}>
          <h3>₹ {data.totalEarnings}</h3>
          <p>Total Earnings</p>
        </div>

        <div style={card}>
          <h3>{data.completedCount}</h3>
          <p>Completed Jobs</p>
        </div>

        <div style={card}>
          <h3>{data.pendingCount}</h3>
          <p>Pending Requests</p>
        </div>

        <div style={card}>
          <h3>{data.acceptedCount}</h3>
          <p>Accepted Jobs</p>
        </div>
      </div>

      <h3>Recent Bookings</h3>

      {data.recentBookings.length === 0 ? (
        <p>No recent bookings</p>
      ) : (
        data.recentBookings.map((b) => (
          <div key={b._id} style={bookingCard}>
            <strong>Service:</strong> {b.listing?.title || "Service"} <br />
            <strong>Price:</strong> ₹{b.price} <br />
            <strong>Status:</strong> {b.status}
          </div>
        ))
      )}
    </div>
  );
}

// styles
const container = { maxWidth: "900px", margin: "25px auto" };
const statsRow = { display: "flex", gap: "20px", marginBottom: "20px" };
const card = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
};
const bookingCard = {
  background: "#fff",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
};
