import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

type INITIALSTATE = Array<{
  content: any;
  state: boolean;
  message: string;
  noLeave?: boolean;
}>;

const initialState: INITIALSTATE = [
  // default state
  //   {
  //     state: true,
  //     message: "loading...",
  //   },
];

const PoppuSlice = createSlice({
  name: "poppu",
  initialState: initialState,
  reducers: {
    setPoppu(state, action) {
      state.push({ ...action.payload });
    },
  },
});

export const { setPoppu } = PoppuSlice.actions;
export const selectPoppu = (state: RootState) => state.poppu;

export default PoppuSlice.reducer;
