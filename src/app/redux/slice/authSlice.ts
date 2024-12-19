import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      if (!state.isLoggedIn) {
        state.isLoggedIn = true;
        state.token = action.payload;
      }
    },
    logout: (state) => {
      if (state.isLoggedIn) {
        state.isLoggedIn = false;
        state.token = null;
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
