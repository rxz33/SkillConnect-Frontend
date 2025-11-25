import axios from "axios";

const api = axios.create({
  baseURL: "https://skillconnect-backend-u3a9.onrender.com/api",
  withCredentials: true,  // 🔥 MUST BE TRUE
});

export default api;
