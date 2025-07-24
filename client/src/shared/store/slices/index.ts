import { combineReducers } from "redux";
import authReducer from "./server";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;