import { configureStore } from '@reduxjs/toolkit';
import cartReducer,{getTotal} from './slices/cartSlice';
import fvrtReducer from './slices/fvrtSlice';
import compareReducer from './slices/compareSlice';
import buyNowReducer from './slices/buyNowSlice';


export const store = configureStore({
  reducer: {
      cart: cartReducer,
      fvrt: fvrtReducer,
      compare: compareReducer,
      buy: buyNowReducer,
  },
})
store.dispatch(getTotal())