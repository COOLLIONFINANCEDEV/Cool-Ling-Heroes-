import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import Randomkey from "../../Helpers/RandomKey";
import { AlertColor } from "@mui/material";

export type ALERTINITIALSTATE = Array<{
  state: AlertColor;
  message: string;
  key?: string;
}>;

const initialState: ALERTINITIALSTATE = [];

const AlertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    setAlert(state, action) {
      state.push({
        ...action.payload,
        key: Randomkey(),
      });
    },
    deleteAlert(state, action) {
      const index = state.findIndex(
        (element) => element.key === action.payload.key
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setAlert, deleteAlert } = AlertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default AlertSlice.reducer;
