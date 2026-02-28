import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeesSlice";

const rootReducer = combineReducers({
    employees: employeesReducer
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;