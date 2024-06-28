import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/",
});

http.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("accessToken")?.trim();
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

export default http;
