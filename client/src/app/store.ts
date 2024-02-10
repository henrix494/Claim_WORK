import { configureStore } from "@reduxjs/toolkit";
import Alluseres from "../features/allUsers/Alluseres";
import userSlice from "../features/auth/auth";
export const store = configureStore({
  reducer: {
    pushUsers: Alluseres,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
