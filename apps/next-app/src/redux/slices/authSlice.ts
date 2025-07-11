'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token:null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    hydrateToken: (state, action) => {
      state.token = action.payload.token;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { hydrateToken, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
