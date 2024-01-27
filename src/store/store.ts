import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export default store;
