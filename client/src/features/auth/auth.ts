import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Login {
  id: number;
  userName: string;
  passWord: string;
  role: string;
}

export interface UserState {
  user: Login | null;
  isLogged: boolean;
}

const initialState: UserState = {
  user: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<Login | null>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
    login: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { login, logOut, userData } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export default userSlice.reducer;
