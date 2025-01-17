import { aquaTrackApi } from "../services/apiClient";

let refreshInterval;

export function startTokenRefreshInterval() {
  const REFRESH_INTERVAL = 14 * 60 * 1000;

  refreshInterval = setInterval(async () => {
    try {
      const response = await aquaTrackApi.post("/users/refresh");

      const accessToken = response.data.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      aquaTrackApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Failed to refresh token:", error);

      stopTokenRefreshInterval();
      localStorage.removeItem("accessToken");
      window.location.href = "/signin";
    }
  }, REFRESH_INTERVAL);
}

export function stopTokenRefreshInterval() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
}
