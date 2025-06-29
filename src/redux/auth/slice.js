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
  refresh,
} from "./operations";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isError: null,
  userCount: null,
};

const setLoading = (state) => {
  state.isLoading = true;
  state.isError = null;
};

const setError = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearAccessToken: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
    resetError: (state) => {
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    // -------------------- Register User --------------------
    builder
      .addCase(register.pending, setLoading)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
      })
      .addCase(register.rejected, (state, action) => {
        setError(state, action);
        userSlice.caseReducers.clearAccessToken(state);
      });

    // -------------------- Log In User --------------------
    builder
      .addCase(login.pending, setLoading)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        setError(state, action);
        userSlice.caseReducers.clearAccessToken(state);
      });

    // -------------------- Refresh Access Token --------------------
    builder
      .addCase(refresh.pending, setLoading)
      .addCase(refresh.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(refresh.rejected, (state, action) => {
        setError(state, action);
        userSlice.caseReducers.clearAccessToken(state);
      });

    // -------------------- Log Out User --------------------
    builder
      .addCase(logout.pending, setLoading)
      .addCase(logout.fulfilled, (state) => {
        userSlice.caseReducers.clearAccessToken(state);
      })
      .addCase(logout.rejected, (state, action) => {
        setError(state, action);
        userSlice.caseReducers.clearAccessToken(state);
      });

    // -------------------- Fetch User Details --------------------

    builder
      .addCase(fetchUserDetails.pending, setLoading)
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data;
      })
      .addCase(fetchUserDetails.rejected, setError);

    // -------------------- Update User --------------------
    builder
      .addCase(updateUser.pending, setLoading)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
      })
      .addCase(updateUser.rejected, setError);

    // -------------------- Update User Password --------------------
    builder
      .addCase(updatePassword.pending, setLoading)
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, setError);

    // -------------------- Get User Count --------------------
    builder
      .addCase(getUserCount.pending, setLoading)
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCount = action.payload.data.userCount;
      })
      .addCase(getUserCount.rejected, setError);

    // -------------------- Forgot Password --------------------
    builder
      .addCase(forgotPassword.pending, setLoading)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, setError);

    // -------------------- Reset Password --------------------
    builder
      .addCase(resetPassword.pending, setLoading)
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, setError);

    // -------------------- Get Google OAuth URL --------------------
    builder
      .addCase(getGoogleOAuthUrl.pending, setLoading)
      .addCase(getGoogleOAuthUrl.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getGoogleOAuthUrl.rejected, setError);

    // -------------------- Log In With Google --------------------
    builder
      .addCase(loginWithGoogle.pending, setLoading)
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
      })
      .addCase(loginWithGoogle.rejected, setError);
  },
});

export const { clearAccessToken, resetError } = userSlice.actions;

export const authReducer = userSlice.reducer;
