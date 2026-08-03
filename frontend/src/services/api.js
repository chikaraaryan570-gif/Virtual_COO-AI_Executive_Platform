import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendChatMessage = async (message) => {
  const response = await api.post("/chat", { message });
  return response.data;
};

export const updateDashboardData = async (data) => {
  const response = await api.post("/dashboard/company/update", data);
  return response.data;
};

// Report generation
export const generateReport = async (type) => {
  const response = await api.post("/reports/generate", { type });
  return response.data;
};

export default api;