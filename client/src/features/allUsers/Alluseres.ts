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
      console.log(state.value.id);
    },
    EditLocalUser: (state, action: PayloadAction<User>) => {
      const index = state.value.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        // If the user is found, update only the provided fields
        state.value[index] = {
          ...state.value[index],
          ...Object.entries(action.payload).reduce((acc, [key, value]) => {
            // Exclude undefined values to prevent overwriting existing values with undefined
            if (value !== "") {
              acc[key] = value;
            }
            return acc;
          }, {} as User),
        };
      }
    },
    SerachUser: (state, action: PayloadAction<string>) => {
      // Filter the results based on the provided name
      const searchQuery = action.payload.toLowerCase();
      const filteredResults = state.value.filter((user) =>
        user.firstName?.toLowerCase().startsWith(searchQuery)
      );

      // Assign the filtered results to a new property in the state
      state.filteredValue = filteredResults;
    },
    sortByNames: (state) => {
      state.value.sort((a, b) => a.firstName.localeCompare(b.firstName));
      state.filteredValue?.sort((a, b) =>
        a.firstName?.localeCompare(b.firstName)
      );
    },
  },
});

export const {
  pushAllUsers,
  DelOneUser,
  EditLocalUser,
  SerachUser,
  sortByNames,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
