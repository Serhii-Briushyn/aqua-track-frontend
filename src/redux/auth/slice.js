import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logout,
  updateUser,
  updatePassword,
  getUserCount,
  sendResetPasswordEmail,
  resetPassword,
  getGoogleOAuthUrl,
  loginWithGoogle,
} from "./operations";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userCount: null,
  googleAuthUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // -------------------- Register --------------------
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Log In --------------------
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Logout --------------------
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Update User --------------------
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Update Password --------------------
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Get User Count --------------------
    builder
      .addCase(getUserCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.loading = false;
        state.userCount = action.payload.userCount;
      })
      .addCase(getUserCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Send Reset Password Email --------------------
    builder
      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Reset Password --------------------
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Get Google OAuth URL --------------------
    builder
      .addCase(getGoogleOAuthUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGoogleOAuthUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.googleAuthUrl = action.payload.url;
      })
      .addCase(getGoogleOAuthUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Login With Google --------------------
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = userSlice.actions;

export default userSlice.reducer;
