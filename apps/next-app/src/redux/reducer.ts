import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import profileducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileducer,
    cart: cartReducer,
  },
});

// Types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
