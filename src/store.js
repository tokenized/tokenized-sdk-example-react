import { configureStore } from '@reduxjs/toolkit';
import { treasurySlice } from './features/treasury/treasurySlice';

export default configureStore({
  reducer: {
    [treasurySlice.name]: treasurySlice.reducer,
  },
});
