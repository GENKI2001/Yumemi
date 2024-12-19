import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slice/authSlice';
import userReducer, { UserState } from './slice/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = {
  auth: AuthState;
  user: UserState;
};
export type AppDispatch = typeof store.dispatch;
