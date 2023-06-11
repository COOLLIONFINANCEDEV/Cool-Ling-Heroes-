import { createSlice } from "@reduxjs/toolkit";
import Roles from "../../Seeds/Roles";
import { RootState } from "../../App/store";
import { dehashValue } from "../../Helpers/Hash/HashValue";
import TokenDecode from "../../Helpers/TokenDecode";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    user: {
      email: undefined,
      phone: undefined,
      role: Roles.lender,
      id: undefined,
      exp: 0,
      iat: 0,
    },
  },
  reducers: {
    CheckUser(state, action) {
      const localStorageTokenHash = localStorage.getItem("accessToken");
      if (localStorageTokenHash) {
        const accessToken = dehashValue(localStorageTokenHash);
        if (accessToken) {
          state.isAuthenticated = true;
          const information: any = TokenDecode(accessToken);
          console.log(information);
          if (information) {
            state.user.email = information?.user?.email;
            state.user.phone = information.user.phone_number;
            state.user.id = information.user.id;
            state.user.exp = information.exp;
            state.user.iat = information.iat;
          }
        }
      }
    },
    LoginOut(state, action) {
      window.location.pathname = "/";
      localStorage.clear();
    },
  },
});

export const { CheckUser, LoginOut } = LoginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default LoginSlice.reducer;
