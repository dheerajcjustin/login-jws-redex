import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: "howhwo",
    loginStatus: false,
    userId: "",
    isLoading: false,
  },

  reducers: {
    changeLoginStatus(state, action) {
      state.loginStatus = action.payload;
      state.isLoading = false;
    },
    changeLoadingStatus(state, action) {
      state.isLoading = true;
    },
    changeTesting(state, action) {
      console.log(action.payload);
      state.value = action.payload.name;
    },
  },
});

export const { changeLoadingStatus, changeTesting, changeLoginStatus } =
  authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
