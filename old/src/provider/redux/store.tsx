import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import helperReducer from '../features/helperSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    helper: helperReducer
  },

});
