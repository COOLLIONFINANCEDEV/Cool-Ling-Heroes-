import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export type LOADERSLICE = Array<LOADERSLICEITEM>;
export type LOADERSLICEITEM = { key: string };

const initialState: LOADERSLICE = [
  {
    key: "Loader",
  },
];

const LoaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    setLoader(state, action) {
      state.push({ ...action.payload });
    },
    deleteLoader(state, action) {
      const element = state.find((element) => {
        return element.key === action.payload.key;
      });

      if (element) {
        const index = state.indexOf(element);
        if (index > -1) {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { setLoader, deleteLoader } = LoaderSlice.actions;
export const selectLoader = (state: RootState) => state.loader;

export default LoaderSlice.reducer;
