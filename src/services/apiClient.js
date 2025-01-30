import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const aquaTrackApi = axios.create({
  baseURL: "https://api.briushyn.dev",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const refreshAuthLogic = async (failedRequest) => {
  try {
    const response = await aquaTrackApi.post("/users/refresh");
    const { accessToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
    throw error;
  }
};

createAuthRefreshInterceptor(aquaTrackApi, refreshAuthLogic);

aquaTrackApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
