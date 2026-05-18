import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api" 
    : (typeof window !== "undefined" && window.location.origin.includes("pages.dev") ? "https://uranus.koyeb.app/api" : "/api"),
  withCredentials: true,
});
