import { configureStore } from "@reduxjs/toolkit";
import Alluseres from "../features/allUsers/Alluseres";
export const store = configureStore({
  reducer: {
    pushUsers: Alluseres,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
