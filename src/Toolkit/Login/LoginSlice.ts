import { createSlice } from "@reduxjs/toolkit";
import Roles from "../../Seeds/Roles";
import { RootState } from "../../App/store";
import { dehashValue } from "../../Helpers/Hash/HashValue";
import TokenDecode from "../../Helpers/TokenDecode";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: true,
    isUpdating: false,
    user: {
      avatar: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: Roles.applicant,
      id: 0,
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
          if (information.user.role === Roles.admin) {
            state.user.role = Roles.admin;
          } else if (information.user.role === Roles.applicant) {
            state.user.role = Roles.applicant;
          } 
          // else if (information.user.role === Roles.advisor) {
          //   state.user.role = Roles.advisor;
          // }
          if (information && !state.isUpdating) {
            state.user.email = information?.user?.email;
            state.user.phone = information.user.phone_number;
            state.user.id = information.user.id;
            state.user.exp = information.exp;
            state.user.iat = information.iat;
            state.user.firstName = information.user.full_name?.split(" ")[0];
            state.user.lastName = information.user.full_name?.split(" ")[1];
          }
        }
      }
    },
    UpdateUser(state, action) {
      if (action.payload.type === "infos") {
        if (Object.keys(action.payload).includes("firstName")) {
          state.isUpdating = true;
          state.user.firstName = action.payload.firstName;
          state.user.lastName = action.payload.lastName;
          state.user.phone = action.payload.phone;
        }
      }
    },
    DisalbeUpdating(state, action) {
      state.isUpdating = false;
    },
    LoginOut(state, action) {
      window.location.pathname = "/";
      localStorage.clear();
    },
  },
});

export const { CheckUser, LoginOut, UpdateUser, DisalbeUpdating } =
  LoginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default LoginSlice.reducer;
