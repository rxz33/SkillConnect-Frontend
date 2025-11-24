import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./WorkerProfile.css";

export default function WorkerProfile() {
  const { id } = useParams();

  const [worker, setWorker] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorker() {
      try {
        // fetch user details
        const res = await api.get(`/auth/user/${id}`);
        setWorker(res.data.user);

        // fetch services listed by this worker
        const listRes = await api.get(`/listings?workerId=${id}`);
        setServices(listRes.data.listings);
      } catch (err) {
        console.error("Worker profile error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadWorker();
  }, [id]);

  if (loading) return <div>Loading profile...</div>;
  if (!worker) return <div>Worker not found</div>;

  return (
    <div className="worker-profile-container">
      <div className="profile-card">
        <img
          src={worker.image || "https://via.placeholder.com/150"}
          alt="worker"
          className="worker-img"
        />

        <h2>{worker.name}</h2>

        <p><strong>Email:</strong> {worker.email}</p>

        <p><strong>Experience:</strong> {worker.experience || "N/A"} years</p>

        <p><strong>Skills:</strong> {worker.skills?.join(", ") || "Not added"}</p>

        <p><strong>Bio:</strong> {worker.bio || "No bio available"}</p>

        <p><strong>Rating:</strong> ⭐ {worker.rating || 0}</p>

        <p><strong>Completed Jobs:</strong> {worker.completedJobs || 0}</p>
      </div>

      <div className="services-section">
        <h3>Services Offered</h3>

        {services.length === 0 ? (
          <p>No services added yet.</p>
        ) : (
          services.map((s) => (
            <div key={s._id} className="service-item">
              <h4>{s.title}</h4>
              <p>{s.description}</p>
              <p><strong>Price:</strong> ₹{s.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
