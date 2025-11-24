import { useEffect, useState } from "react";
import api from "../services/api";
import "./WorkerDashboard.css";

export default function WorkerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/worker", { withCredentials: true });
      const list = Array.isArray(res.data.bookings) ? res.data.bookings : [];

      setBookings(list);
    } catch (err) {
      console.log("Worker dashboard error:", err);
      setMsg("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/bookings/${id}`,
        { status },
        { withCredentials: true }
      );

      setMsg(`Booking ${status}`);
      loadBookings();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error updating status");
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="worker-dashboard">
      <h2>Worker Dashboard</h2>

      {msg && <p className="status-msg">{msg}</p>}

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div className="booking-card" key={b._id}>
            <h3>{b.listing?.title}</h3>

            <p><strong>Customer:</strong> {b.customer?.name}</p>
            <p><strong>Address:</strong> {b.address}</p>
            <p><strong>Date:</strong> {new Date(b.scheduledDate).toLocaleString()}</p>
            <p><strong>Price:</strong> ₹{b.price}</p>
            <p><strong>Status:</strong> {b.status}</p>

            {/* Buttons */}

            {b.status === "pending" && (
              <>
                <button
                  className="accept-btn"
                  onClick={() => updateStatus(b._id, "accepted")}
                >
                  Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(b._id, "rejected")}
                >
                  Reject
                </button>
              </>
            )}

            {b.status === "accepted" && (
              <button
                className="complete-btn"
                onClick={() => updateStatus(b._id, "completed")}
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
