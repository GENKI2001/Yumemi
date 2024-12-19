import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: 'test@example.com',
  password: 'password',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
