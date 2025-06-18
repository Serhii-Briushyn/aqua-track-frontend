import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const aquaTrackApi = axios.create({
  baseURL: "https://api.briushyn.dev",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const refreshAuthLogic = async (failedRequest) => {
  const originalUrl = failedRequest?.response?.config?.url ?? "";
  console.log("🔍 Refresh triggered for:", originalUrl);

  let pathname = "";
  try {
    const urlObj = new URL(originalUrl, window.location.origin);
    pathname = urlObj.pathname;
    console.log("📎 Parsed pathname:", pathname);
  } catch {
    pathname = originalUrl;
    console.warn("⚠️ Could not parse URL, using raw:", pathname);
  }

  if (
    pathname === "/users/login" ||
    pathname === "/users/register" ||
    pathname === "/users/refresh"
  ) {
    console.warn("🚫 Skipping refresh for endpoint:", pathname);
    return Promise.reject(failedRequest);
  }

  try {
    console.log("🔄 Sending request to /users/refresh...");
    const response = await aquaTrackApi.post("/users/refresh");
    const { accessToken } = response.data.data;

    console.log("✅ Refresh successful. New token:", accessToken);

    localStorage.setItem("accessToken", accessToken);
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const storeModule = await import("../redux/store");
    const { setAccessToken } = await import("../redux/auth/slice");

    storeModule.store.dispatch(setAccessToken({ accessToken }));
    console.log("📦 Dispatched setAccessToken to Redux");

    return Promise.resolve();
  } catch (error) {
    console.error("❌ Refresh failed:", error);

    const storeModule = await import("../redux/store");
    const { clearAccessToken } = await import("../redux/auth/slice");

    storeModule.store.dispatch(clearAccessToken());
    console.warn("🧹 Dispatched clearAccessToken to Redux");

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
