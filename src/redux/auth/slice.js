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
} from "./operations";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isError: null,
  userCount: null,
  googleAuthUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    // -------------------- Register --------------------
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Log In --------------------
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Logout --------------------
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
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

    // -------------------- Update Password --------------------
    builder
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoggedIn = false;
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

    // -------------------- Send Reset Password Email --------------------
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
      .addCase(getGoogleOAuthUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.googleAuthUrl = action.payload.data.url;
      })
      .addCase(getGoogleOAuthUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // -------------------- Login With Google --------------------
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { resetError } = userSlice.actions;

export const authReducer = userSlice.reducer;
