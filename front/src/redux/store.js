import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    fetchUser: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return {};
    },
  },
});

export const { fetchUser, logout } = userSlice.actions;

const turnsSlice = createSlice({
  name: "turns",
  initialState: {},
  reducers: {
    fetchData: (state, action) => {
      return action.payload;
    },
    cleanData: () => {
      return {};
    },
  },
});

export const { fetchData, cleanData } = turnsSlice.actions;

export const exit = () => {
  return async (dispatch) => {
    dispatch(logout());
    dispatch(cleanData());
  };
};

const store = configureStore({
  reducer: {
    turns: turnsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
