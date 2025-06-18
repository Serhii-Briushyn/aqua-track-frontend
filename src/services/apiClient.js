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
    const storeModule = await import("../redux/store");
    const { setAccessToken } = await import("../redux/auth/slice");
    storeModule.store.dispatch(setAccessToken({ accessToken }));
    return Promise.resolve();
  } catch (error) {
    const storeModule = await import("../redux/store");
    const { clearAccessToken } = await import("../redux/auth/slice");
    storeModule.store.dispatch(clearAccessToken());
    console.error("Refresh error → clearing auth", error);

    return Promise.reject(error);
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
