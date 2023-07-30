import axios from "axios";

export const API_URL = "http://localhost:1337/api";

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (e) {
        console.log("не авторизован");
      }
    }
    throw error;
  }
);

export default $api;
