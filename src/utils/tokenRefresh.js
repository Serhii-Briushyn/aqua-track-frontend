import { aquaTrackApi } from "../services/apiClient";

let refreshInterval;

export function startTokenRefreshInterval() {
  const REFRESH_INTERVAL = 14 * 60 * 1000;

  refreshInterval = setInterval(async () => {
    try {
      const refreshResponse = await aquaTrackApi.post("/auth/refresh");

      const { accessToken } = refreshResponse.data.data;

      localStorage.setItem("accessToken", accessToken);

      aquaTrackApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Failed to refresh token:", error);

      stopTokenRefreshInterval();
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  }, REFRESH_INTERVAL);
}

export function stopTokenRefreshInterval() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
}
