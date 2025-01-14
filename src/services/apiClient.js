import axios from "axios";

export const aquaTrackApi = axios.create({
  baseURL: "https://api.briushyn.dev",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
