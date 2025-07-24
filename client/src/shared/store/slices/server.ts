import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {type AuthState} from '../types/server';

const initialState: AuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
export const { setAuth } = authSlice.actions;
export default authReducer;