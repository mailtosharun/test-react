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
    /** Initiates a user login by updating the application state with the provided user and authentication information. */
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastAction = 'login';
    },
    /**
Logs out the user, resetting authentication state and recording the last action.
*/
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.lastAction = 'logout';
    },
    /**
Registers a new user by updating the application state with the provided user data and authentication status.
*/
    register(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastAction = 'register';
    },
    /** Sets the application mode based on the provided action payload. */
    setMode(state, action: PayloadAction<'login' | 'register' | 'guest' | 'admin'>) {
      state.mode = action.payload;
      state.lastAction = `mode:${action.payload}`;
    },
    /** Transforms the application mode based on the provided action payload. */
    transformer(state, action: PayloadAction<{ trigger: string; data?: any }>) {
      // Example: complex logic to change mode based on trigger
      /** Updates the application mode and last action based on the trigger and user email. */
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
    /** Updates the user state with new information from the provided action. */
    updateUser(state, action: PayloadAction<Partial<User>>) {
      /** Updates the user state with the provided payload and logs the last action as updateUser. */
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastAction = 'updateUser';
      }
    },
    /** Resets the application state to its initial value. */
    resetState() {
      return initialState;
    },
  },
});

export const { login, logout, register, setMode, transformer, updateUser, resetState } = userSlice.actions;
export default userSlice.reducer;