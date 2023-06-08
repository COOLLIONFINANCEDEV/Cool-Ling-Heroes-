import { createSlice } from "@reduxjs/toolkit";
import Roles from "../../Seeds/Roles";
import { RootState } from "../../App/store";
import { dehashValue } from "../../Helpers/Hash/HashValue";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    user: { name: undefined, lastName: undefined, role: Roles.lender },
    refresh: false,
  },
  reducers: {
    CheckUser(state, action) {
      const localStorageTokenHash = localStorage.getItem("accessToken");
      if (localStorageTokenHash) {
        const accessToken = dehashValue(localStorageTokenHash);
        if (accessToken) {
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { CheckUser } = LoginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default LoginSlice.reducer;
