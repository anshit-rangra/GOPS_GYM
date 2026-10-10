import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  initialized: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    registrationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.initialized = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken ?? state.accessToken;
    },

    authResolved: (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.initialized = true;
      state.user = action.payload.user;
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
    },

    sessionChecked: (state) => {
      state.initialized = true;
      state.loading = false;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.initialized = true;
      state.loading = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registrationStart,
  loginStart,
  registrationSuccess,
  loginSuccess,
  authResolved,
  sessionChecked,
  setAccessToken,
  setUser,
  registrationFailure,
  loginFailure,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
