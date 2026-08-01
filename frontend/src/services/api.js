import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendChatMessage = async (message) => {
  const response = await api.post("/chat", { message });
  return response.data;
};

export const getDashboardData = async () => {
  const response = await api.get("/dashboard/company");
  return response.data;
};

export const getCompanyHealth = async () => {
  const response = await api.get("/company-health");
  return response.data;
};

export default api;