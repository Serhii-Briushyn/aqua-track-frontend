import { refreshAccessToken } from "../redux/auth/operations";
import { clearAccessToken } from "../redux/auth/slice";

let isRefreshing = false;
let refreshPromise = null;

export const authRequest = async (axiosFn, thunkAPI) => {
  try {
    return await axiosFn();
  } catch (error) {
    const status = error?.response?.status;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = thunkAPI
          .dispatch(refreshAccessToken())
          .unwrap()
          .finally(() => {
            isRefreshing = false;
          });
      }

      try {
        await refreshPromise;
        return await axiosFn();
      } catch {
        thunkAPI.dispatch(clearAccessToken());
        return thunkAPI.rejectWithValue("Session expired");
      }
    }

    throw error;
  }
};
