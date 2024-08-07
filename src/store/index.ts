import { configureStore } from "@reduxjs/toolkit";
import { meals } from "./slices/meals";
import { useDispatch, useSelector } from "react-redux";
import { statistics } from "./slices/statistics";

export const store = configureStore({
  reducer: {
    meals,
    statistics,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
