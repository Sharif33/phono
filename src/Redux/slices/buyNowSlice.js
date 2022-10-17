import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const buyNowSlice = createSlice({
    name: 'buy',
    initialState: {
        // addToBuy: [],
        addToBuy: localStorage.getItem("addedToBuy") ? JSON.parse(localStorage.getItem('addedToBuy') || '{}') : [],
        discover: [],
        status: 'idle'
    },
    reducers: {
        addToBuy: (state, { payload }) => {
            // state.addToBuy.push(payload)
            state.addToBuy.findIndex(item => item._id === payload._id);

                const newBuy = { ...payload }
                state.addToBuy.push(newBuy)

          if (state.addToBuy?.length >1) {
            state.addToBuy.splice(0,1);
            }
            toast.success(`${payload.name} is ready for BUY`, {
                position: "bottom-left",
              });
            localStorage.setItem("addedToBuy", JSON.stringify(state.addToBuy));             
    },

    removeFromBuy: (state, { payload }) => {
        // state.addToBuy = state.addToBuy.filter(cart => cart.id !== payload.id);
        const newItems = state.addToBuy.filter(item => item._id !== payload._id);
        state.addToBuy = newItems;
        toast.error(`${payload.name} removed`, {
            position: "bottom-left",
          });
        localStorage.setItem("addedToBuy", JSON.stringify(state.addToBuy));
    },

    clearBuy(state) {
        state.addToBuy = [];
        localStorage.setItem("addedToBuy", JSON.stringify(state.addToBuy));
    }
    
    }
    
});

export const { addToBuy, removeFromBuy, clearBuy } = buyNowSlice.actions;

export default buyNowSlice.reducer;