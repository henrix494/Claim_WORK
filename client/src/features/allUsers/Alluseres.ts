import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  zipcode?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

export interface CounterState {
  value: User[];
  filteredValue?: User[];
}

const initialState: CounterState = {
  value: [],
  filteredValue: [],
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    pushAllUsers: (state, action: PayloadAction<User[]>) => {
      state.value = action.payload;
    },
    DelOneUser: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
      state.filteredValue = state.filteredValue?.filter(
        (user) => user.id !== action.payload
      );
    },
    EditLocalUser: (state, action: PayloadAction<User>) => {
      const { id, ...updatedUser } = action.payload;

      const updateArray = (arr: User[] | undefined) => {
        if (!arr) return;
        const index = arr.findIndex((user) => user.id === id);

        if (index !== -1) {
          arr[index] = {
            ...arr[index],
            ...Object.entries(updatedUser).reduce((acc, [key, value]) => {
              if (value !== undefined && value !== "") {
                acc[key] = value;
              }
              return acc;
            }, {} as User),
          };
        }
      };

      updateArray(state.value);
      updateArray(state.filteredValue);
    },
    SerachUserByname: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      const filteredResults = state.value.filter((user) =>
        user.firstName?.toLowerCase().startsWith(searchQuery)
      );

      state.filteredValue = searchQuery ? filteredResults : undefined;
    },

    SerachUserByLastName: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      const filteredResults = state.value.filter((user) =>
        user.lastName?.toLowerCase().startsWith(searchQuery)
      );

      state.filteredValue = searchQuery ? filteredResults : undefined;
    },
  },
});

export const {
  pushAllUsers,
  DelOneUser,
  EditLocalUser,
  SerachUserByname,
  SerachUserByLastName,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
