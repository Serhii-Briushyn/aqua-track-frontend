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
    const storeModule = await import("@store/store");
    const { setAccessToken } = await import("@store/users/slice");
    storeModule.store.dispatch(setAccessToken({ accessToken }));
  } catch (error) {
    const storeModule = await import("@store/store");
    const { clearAccessToken } = await import("@store/users/slice");
    storeModule.store.dispatch(clearAccessToken());
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
