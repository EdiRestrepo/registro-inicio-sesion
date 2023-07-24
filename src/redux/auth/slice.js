import { createSlice } from "@reduxjs/toolkit"
import { login, register } from "./operations";

const initialState = {
    user: { firstName: null, lastName: null, email: null },
    token: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
    formError: null,

};

const handlePending = state => {
    state.isLoading = true;
}

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormError(state, { payload }) {
      state.formError = payload;
    },
    clearFormError(state) {
      state.formError = null;
    },
    clearError(state) {
      state.error = null;
    },
    userLogout(state) {
      state.user = { firstName: null, lastName: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [register.pending]: handlePending,
    [login.pending]: handlePending,
    [register.rejected]: handleRejected,
    [login.rejected]: handleRejected,
    [register.fulfilled](state, { payload }) {
      const { firstName, lastName, email } = payload.user;
      state.user = { firstName, lastName, email };
      state.token = payload.accessToken;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    [login.fulfilled](state, { payload }) {
      const { firstName, lastName, email } = payload.user;
      state.user = { firstName, lastName, email };
      state.token = payload.accessToken;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setFormError, clearError, clearFormError, userLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;