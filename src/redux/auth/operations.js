import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaTrackApi } from "../../services/apiClient";

// -------------------- Error Handling Function --------------------

const handleApiError = (error, thunkAPI) => {
  if (error.response) {
    const backendMessage =
      error.response.data?.message || "An error occurred. Please try again.";
    return thunkAPI.rejectWithValue(backendMessage);
  }

  return thunkAPI.rejectWithValue("Something went wrong. Please try again.");
};

// -------------------- Axios Request Interceptor --------------------

aquaTrackApi.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -------------------- Axios Response Interceptor --------------------

aquaTrackApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await aquaTrackApi.post("/users/refresh");

        const { accessToken } = refreshResponse.data.data;

        localStorage.setItem("accessToken", accessToken);

        aquaTrackApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return aquaTrackApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// -------------------- Register User Thunk --------------------

export const register = createAsyncThunk(
  "users/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/register", credentials);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Log In User Thunk --------------------

export const logIn = createAsyncThunk(
  "users/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/auth/login", credentials);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Log Out User Thunk --------------------

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await aquaTrackApi.post("/users/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    return handleApiError(error, thunkAPI);
  }
});

// -------------------- Update User Thunk --------------------

export const updateUser = createAsyncThunk(
  "user/update",
  async (formData, thunkAPI) => {
    try {
      const response = await aquaTrackApi.put("/users/update-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Update Password Thunk --------------------

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const response = await aquaTrackApi.put("/users/update-password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Get User Count Thunk --------------------

export const getUserCount = createAsyncThunk(
  "user/getUserCount",
  async (_, thunkAPI) => {
    try {
      const response = await aquaTrackApi.get("/users/count");
      return response.data.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Send Reset Password Email Thunk --------------------

export const sendResetPasswordEmail = createAsyncThunk(
  "user/sendResetPasswordEmail",
  async (email, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post(
        "/users/reset-password-request",
        { email }
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Reset Password Thunk --------------------

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/reset-password", {
        token,
        newPassword,
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

// -------------------- Login With Google Thunk --------------------

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (code, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/google-login", { code });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);
