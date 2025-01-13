import axios from "axios";

export const aquaTrackApi = axios.create({
  // baseURL: "https://aqua-track-backend-4vct.onrender.com",
  baseURL: "https://aqua-track-backend-4vct.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicApi = axios.create({
  baseURL: "https://aqua-track-backend-4vct.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
