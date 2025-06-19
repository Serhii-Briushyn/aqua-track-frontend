import { createAsyncThunk } from "@reduxjs/toolkit";

import { aquaTrackApi } from "../../services/apiClient";
import { clearAccessToken, setAccessToken } from "./slice";
import { authRequest } from "../../utils/authRequest";

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
      thunkAPI.dispatch(
        setAccessToken({ accessToken: response.data.data.accessToken })
      );
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
      thunkAPI.dispatch(
        setAccessToken({ accessToken: response.data.data.accessToken })
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }

      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Refresh Access Token Thunk --------------------

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const response = await aquaTrackApi.post("/users/refresh");
      const { accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      thunkAPI.dispatch(setAccessToken({ accessToken }));
      return accessToken;
    } catch (error) {
      thunkAPI.dispatch(clearAccessToken());
      return handleApiError(error, thunkAPI);
    }
  }
);

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
    try {
      const response = await authRequest(
        () => aquaTrackApi.get("/users/me"),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }

      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Update User Thunk --------------------

export const updateUser = createAsyncThunk(
  "user/update",
  async (formData, thunkAPI) => {
    try {
      const response = await authRequest(
        () =>
          aquaTrackApi.put("/users/update-user", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }

      return handleApiError(error, thunkAPI);
    }
  }
);

// -------------------- Update User Password Thunk --------------------

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const response = await authRequest(
        () =>
          aquaTrackApi.put("/users/update-password", {
            oldPassword,
            newPassword,
          }),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }

      return handleApiError(error, thunkAPI);
    }
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
      const response = await authRequest(
        () =>
          aquaTrackApi.post("/users/reset-password", {
            token,
            password,
          }),
        thunkAPI
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }

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
      const response = await authRequest(
        () => aquaTrackApi.post("/users/google-login", { code }),
        thunkAPI
      );
      thunkAPI.dispatch(
        setAccessToken({ accessToken: response.data.data.accessToken })
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }

      return handleApiError(error, thunkAPI);
    }
  }
);
