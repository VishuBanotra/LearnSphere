import { createSlice } from "@reduxjs/toolkit";

import { loadUser } from "../actions/auth.action";
import { signIn } from "../actions/auth.action";
import { signUp } from "../actions/auth.action";

type InitialType = {
  userId: null;
  userRole: null;
  loading: boolean;
  isAuthenticated: boolean;
  error: null;
};

const initialState: InitialType = {
  userId: null,
  userRole: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      state.loading = true;
      state.isAuthenticated = false;
      state.userRole = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.userId = null;
      state.userRole = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userId = action.payload.id;
      state.userRole = action.payload.role;
      state.isAuthenticated = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.userId = null;
      state.userRole = null;
      state.error = action.payload;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload.success;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;
