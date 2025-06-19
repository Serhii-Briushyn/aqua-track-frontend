import axios from "axios";

export const aquaTrackApi = axios.create({
  baseURL: "https://api.briushyn.dev",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

aquaTrackApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
