import axios from "axios";

export const aquaTrackApi = axios.create({
  baseURL: "https://aqua-track-backend-moj8.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

