import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preferences: {
    language: 'en',
    notifications: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
  },
});

export const { setPreferences, resetPreferences } = userSlice.actions;

export default userSlice.reducer;
