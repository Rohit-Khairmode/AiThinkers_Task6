import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true, // 👈 REQUIRED to send/receive cookies
});
export default api;
