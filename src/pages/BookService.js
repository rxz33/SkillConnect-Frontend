import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    scheduledDate: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/listings/${id}`);
        setService(res.data.listing);
      } catch (err) {
        setMessage("Service not found");
      }
    }
    load();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/bookings",
        {
          listingId: id,
          scheduledDate: form.scheduledDate,
          address: form.address,
        },
        { withCredentials: true }
      );

      setMessage("Booking successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  if (!service) return <div>Loading service...</div>;

  return (
    <div className="book-form-container">
      <h2>Book: {service.title}</h2>

      <form onSubmit={handleBooking} className="book-form">
        <input
          type="datetime-local"
          name="scheduledDate"
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Enter your address"
          onChange={handleChange}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}
