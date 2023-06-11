import { configureStore } from "@reduxjs/toolkit";
import LoaderSlice from "../Toolkit/Loader/LoaderSlice";
import LoginSlice from "../Toolkit/Login/LoginSlice";
import AlertSlice from "../Toolkit/Alert/AlertSlice";
import PoppuSlice from "../Toolkit/Poppu/PoppuSlice";

export const store = configureStore({
  reducer: {
    loader: LoaderSlice,
    login: LoginSlice,
    alert: AlertSlice,
    poppu: PoppuSlice,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
