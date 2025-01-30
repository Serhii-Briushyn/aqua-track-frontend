import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  updateUser,
  updatePassword,
  getUserCount,
  forgotPassword,
  resetPassword,
  getGoogleOAuthUrl,
  loginWithGoogle,
  fetchUserDetails,
} from "./operations";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isLoggedIn: !!localStorage.getItem("accessToken"),
  isLoading: false,
  isError: null,
  userCount: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    },
    resetError: (state) => {
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    // -------------------- Register User --------------------
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Log In User --------------------
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Log Out User --------------------
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Fetch User Details --------------------

    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Update User --------------------
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Update User Password --------------------
    builder
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Get User Count --------------------
    builder
      .addCase(getUserCount.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCount = action.payload.data.userCount;
      })
      .addCase(getUserCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Forgot Password --------------------
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Reset Password --------------------
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Get Google OAuth URL --------------------
    builder
      .addCase(getGoogleOAuthUrl.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getGoogleOAuthUrl.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getGoogleOAuthUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Log In With Google --------------------
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { setAccessToken, clearAccessToken, resetError } =
  userSlice.actions;

export const authReducer = userSlice.reducer;
