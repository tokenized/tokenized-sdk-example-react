import { createSlice } from '@reduxjs/toolkit';

export const treasurySlice = createSlice({
  name: 'treasury',
  initialState: {
    currentFilter: 'assets',
  },
  reducers: {
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

export const selectTreasuryCurrentFilter = (state) =>
  state?.treasury?.currentFilter;

export const { setCurrentFilter } = treasurySlice.actions;
