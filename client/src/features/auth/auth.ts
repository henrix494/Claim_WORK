import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Login {
  id: number;
  userName: string;
  passWord: string;
  role: string;
}

export interface UserState {
  user: Login | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Login | null>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export default userSlice.reducer;
