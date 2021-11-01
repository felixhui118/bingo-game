import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../reducer/bingo/bingoSlice";

export const store = configureStore({
  reducer: {
    bingo: counterReducer,
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
