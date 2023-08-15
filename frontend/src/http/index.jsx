import axios from "axios";



const $api = axios.create({
  baseURL: process.env.REACT.APP_API_URL,
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
        window.location.reload();
      } catch (e) {
        console.error("непредвиденная ошибка", e.message);
      }
    }
    throw error;
  }
);

export default $api;





      