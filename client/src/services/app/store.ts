import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import courseReducer from "./slices/instructor.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
