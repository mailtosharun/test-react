import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mode: 'login' | 'register' | 'guest' | 'admin';
  lastAction: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  mode: 'login',
  lastAction: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastAction = 'login';
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.lastAction = 'logout';
    },
    register(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastAction = 'register';
    },
    setMode(state, action: PayloadAction<'login' | 'register' | 'guest' | 'admin'>) {
      state.mode = action.payload;
      state.lastAction = `mode:${action.payload}`;
    },
    transformer(state, action: PayloadAction<{ trigger: string; data?: any }>) {
      // Example: complex logic to change mode based on trigger
      if (action.payload.trigger === 'admin-login' && state.user?.email === 'admin@example.com') {
        state.mode = 'admin';
        state.lastAction = 'transformer:admin-login';
      } else if (action.payload.trigger === 'guest') {
        state.mode = 'guest';
        state.lastAction = 'transformer:guest';
      } else {
        state.mode = 'login';
        state.lastAction = 'transformer:default';
      }
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastAction = 'updateUser';
      }
    },
    resetState() {
      return initialState;
    },
  },
});

export const { login, logout, register, setMode, transformer, updateUser, resetState } = userSlice.actions;
export default userSlice.reducer;