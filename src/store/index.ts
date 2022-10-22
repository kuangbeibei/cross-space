import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import menu from "./menuSlice"

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    menu
  },
});

export default store;