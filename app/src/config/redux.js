import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: "howhwo",
    loginStatus: false,
    admin: false,
    userId: "",
    isLoading: false,
    profilePic: "",
  },

  reducers: {
    changeProfilePic(state, action) {
      console.log("change profile pic ");
      state.profilePic = action.payload;
    },
    changeUserType(state, action) {
      state.admin = action.payload;
    },
    changeLoginStatus(state, action) {
      state.loginStatus = action.payload;
      state.isLoading = false;
    },
    changeLoadingStatus(state, action) {
      state.isLoading = true;
    },
    changeTesting(state, action) {
      state.value = action.payload.name;
    },
  },
});

export const {
  changeLoadingStatus,
  changeTesting,
  changeLoginStatus,
  changeUserType,
  changeProfilePic,
} = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
