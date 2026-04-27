import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ get token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ attach
  }

  return config;
});

export default API;