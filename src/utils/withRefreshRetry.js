import { refresh } from "../redux/auth/operations";

export const withRefreshRetry = async (
  axiosFn,
  thunkAPI,
  onError = (error) => {
    throw error;
  }
) => {
  try {
    const response = await axiosFn();
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401 && localStorage.getItem("accessToken")) {
      await thunkAPI.dispatch(refresh()).unwrap();
      const retryResponse = await axiosFn();
      return retryResponse.data;
    }
    return onError(error, thunkAPI);
  }
};
