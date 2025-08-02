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
    /** Logs in a user and updates the application state with the provided user data. */
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastAction = 'login';
    },
    /** Logs out the user by clearing authentication and updating internal state. */
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.lastAction = 'logout';
    },
    /** Registers a new user by updating the application state with the provided user information. */
    register(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastAction = 'register';
    },
    /** Sets the application mode based on the given action and updates the last action timestamp. */
    setMode(state, action: PayloadAction<'login' | 'register' | 'guest' | 'admin'>) {
      state.mode = action.payload;
      state.lastAction = `mode:${action.payload}`;
    },
    /**
Transforms the application state based on a given action payload, updating the mode and last action accordingly.
    transformer(state, action: PayloadAction<{ trigger: string; data?: any }>) {
      // Example: complex logic to change mode based on trigger
      /** Transforms the application state based on the given action and user email. */
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
    /** Updates the user state with the provided payload and records the last action. */
    updateUser(state, action: PayloadAction<Partial<User>>) {
      /**
Updates the user state with the provided payload and records the last action as updateUser.
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastAction = 'updateUser';
      }
    },
    /** Resets the application state to its initial configuration. */
    resetState() {
      return initialState;
    },
  },
});

export const { login, logout, register, setMode, transformer, updateUser, resetState } = userSlice.actions;
export default userSlice.reducer;