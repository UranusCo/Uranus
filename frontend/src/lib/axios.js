import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api" 
    : (typeof window !== "undefined" && window.location.origin.includes("pages.dev") ? "https://uranus.koyeb.app/api" : "/api"),
  withCredentials: true,
});

// Add a request interceptor to attach Authorization header if token is in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
