import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        addToCompare: localStorage.getItem("addedToCompare") ? JSON.parse(localStorage.getItem('addedToCompare') || '{}') : [],
        discover: [],
        removeFromCompare: [],
        status: 'idle'
    },
    reducers: {
        addToCompare: (state, { payload }) => {
            // state.addToCompare.push(payload)
            
            const itemIndex = state.addToCompare.findIndex(item => item._id === payload._id);

            if (itemIndex >= 0) {
                toast.info(`${payload.name} Already in Compared List`, {
                    position: "bottom-left",
                  });
            }  
            else if (state.addToCompare?.length >= 2){
                toast.warning(`Only 2 items are comparable. Please remove previous one from compare section`, {
                    position: "bottom-left",
                  });
             }

            else {
                
                const newCompare = { ...payload }
                state.addToCompare.push(newCompare);
                toast.success(`${payload.name} added to compare`, {
                    position: "bottom-left",
                  });
        }
        localStorage.setItem("addedToCompare", JSON.stringify(state.addToCompare));
    },
        removeFromCompare: (state, { payload }) => {
            // state.addToCompare = state.addToCompare.filter(cart => cart.id !== payload.id);
            const newItems = state.addToCompare.filter(item => item._id !== payload._id)
            state.addToCompare = newItems;
            toast.warning(`${payload.name} remove from compare`, {
                position: "bottom-left",
              });
            localStorage.setItem("addedToCompare", JSON.stringify(state.addToCompare));
        },
        clearCompare(state) {
            state.addToCompare = [];
            toast.error(`All compared items cleared`, {
                position: "bottom-left",
              });
            localStorage.setItem("addedToCompare", JSON.stringify(state.addToCompare));
        }
    }
    
});

export const { addToCompare, removeFromCompare, clearCompare} = compareSlice.actions;

export default compareSlice.reducer;