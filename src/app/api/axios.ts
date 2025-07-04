import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token)
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as any;
  }
  return config;
});

export default api;
