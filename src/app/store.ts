import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mineSlice from "./mineSlice";

export const store = configureStore({
  reducer: {
    minesweeper: mineSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
