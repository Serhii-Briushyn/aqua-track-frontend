import { refreshAccessToken } from "../redux/auth/operations";
import { clearAccessToken } from "../redux/auth/slice";

export const authRequest = async (axiosFn, thunkAPI) => {
  try {
    return await axiosFn();
  } catch (error) {
    const status = error?.response?.status;

    if (status === 401) {
      try {
        await thunkAPI.dispatch(refreshAccessToken()).unwrap();
        return await axiosFn();
      } catch {
        thunkAPI.dispatch(clearAccessToken());
        return thunkAPI.rejectWithValue("Session expired");
      }
    }
    throw error;
  }
};
