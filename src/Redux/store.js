import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import fvrtReducer from './slices/fvrtSlice';


export const store = configureStore({
  reducer: {
      cart: cartReducer,
      fvrt: fvrtReducer,
  },
})