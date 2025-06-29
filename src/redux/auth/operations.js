import { createAsyncThunk } from "@reduxjs/toolkit";

import { aquaTrackApi } from "../../services/apiClient";
import { clearAccessToken } from "./slice";
import { withRefreshRetry } from "../../utils/withRefreshRetry";

// -------------------- Error Handling Function --------------------

const handleApiError = (error, thunkAPI) => {
  if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 400) {
      return thunkAPI.rejectWithValue("BadRequestError");
    } else if (statusCode === 401) {
      return thunkAPI.rejectWithValue("UnauthorizedError");
    } else if (statusCode === 404) {
      return thunkAPI.rejectWithValue("UserNotFound");
    } else if (statusCode === 409) {
      return thunkAPI.rejectWithValue("ConflictError");
    } else if (statusCode === 500) {
      return thunkAPI.rejectWithValue("SomethingWentWrong");
    }
  }

  return thunkAPI.rejectWithValue("defaultError");
};

// -------------------- Register User Thunk --------------------

export const register = createAsyncThunk(
  "users/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/register", credentials);
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Log In User Thunk --------------------

export const login = createAsyncThunk(
  "users/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/login", credentials);
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Refresh User Thunk --------------------

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await aquaTrackApi.post("/users/refresh");
    const { accessToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(clearAccessToken());
    return handleApiError(error, thunkAPI);
  }
});

// -------------------- Log Out User Thunk --------------------

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    await aquaTrackApi.post("/users/logout");
    thunkAPI.dispatch(clearAccessToken());
  } catch (error) {
    return handleApiError(error, thunkAPI);
  }
});

// -------------------- Fetch User Details Thunk --------------------

export const fetchUserDetails = createAsyncThunk(
  "user/fetchDetails",
  async (_, thunkAPI) => {
    return withRefreshRetry(
      () => aquaTrackApi.get("/users/me"),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Update User Thunk --------------------

export const updateUser = createAsyncThunk(
  "user/update",
  async (formData, thunkAPI) => {
    return withRefreshRetry(
      () =>
        aquaTrackApi.put("/users/update-user", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Update User Password Thunk --------------------

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    return withRefreshRetry(
      () =>
        aquaTrackApi.put("/users/update-password", {
          oldPassword,
          newPassword,
        }),
      thunkAPI,
      handleApiError
    );
  }
);

// -------------------- Get User Count Thunk --------------------

export const getUserCount = createAsyncThunk(
  "getUserCount",
  async (_, thunkAPI) => {
    try {
      const response = await aquaTrackApi.get("/users/count");
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Forgot Password Thunk --------------------

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (values, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/forgot-password", {
        email: values.email,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Reset Password Thunk --------------------

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Get Google OAuth URL Thunk --------------------

export const getGoogleOAuthUrl = createAsyncThunk(
  "user/getGoogleOAuthUrl",
  async (_, thunkAPI) => {
    try {
      const response = await aquaTrackApi.get("/users/google-oauth-url");
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Log In With Google Thunk --------------------

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (code, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/google-login", { code });

      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);
