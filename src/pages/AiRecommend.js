import { useState } from "react";
import api from "../services/api";
import "./AiRecommend.css";
import { Link } from "react-router-dom";

export default function AiRecommend() {
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setMessage("");

    try {
      const res = await api.post("/ai/recommend", {
        service,
        budget: Number(budget),
      });

      if (!res.data.ok) {
        setMessage("No recommendations found");
      } else {
        setResults(res.data.results);
      }
    } catch (err) {
      setMessage("AI could not generate recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <h2>AI Worker Recommendation</h2>

      <form className="ai-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service name (e.g. AC Repair)"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Your budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <button type="submit">Find Best Workers</button>
      </form>

      {loading && <p>Finding best workers...</p>}
      {message && <p className="ai-msg">{message}</p>}

      <div className="ai-results">
        {results.map((item, index) => (
          <div className="ai-card" key={index}>
            <h3>{item.listing.title}</h3>

            <p><strong>Worker:</strong> {item.listing.owner.name}</p>
            <p><strong>Price:</strong> ₹{item.listing.price}</p>
            <p><strong>Rating:</strong> ⭐ {item.listing.rating}</p>
            <p><strong>Experience:</strong> {item.listing.owner.experience || "N/A"} years</p>

            {item.ai && (
              <div className="ai-reason">
                <strong>Why Recommended:</strong>
                <p>{item.ai.reason || "No reason"}</p>
              </div>
            )}

            <div className="ai-actions">
              <Link to={`/worker/${item.listing.owner._id}`} className="btn">
                View Profile
              </Link>

              <Link to={`/service/${item.listing._id}`} className="btn btn-book">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
