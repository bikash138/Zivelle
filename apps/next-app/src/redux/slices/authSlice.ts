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
    logout: (state) => {
      state.token = null
      localStorage.removeItem('userProfile')
      localStorage.removeItem('sellerProfile')
      localStorage.removeItem('profile')
      localStorage.removeItem('token')
      localStorage.removeItem('cart')
      localStorage.removeItem('totalItems')
      localStorage.removeItem('total')
    }
  },
});

export const { hydrateToken, setLoading, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
