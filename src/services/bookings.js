import api from "./api";

export const fetchBookings = () =>
  api.get("/bookings/worker", { withCredentials: true });

export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}/status`, { status }, { withCredentials: true });
