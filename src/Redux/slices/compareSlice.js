import { createSlice } from '@reduxjs/toolkit'

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
                alert("Already in Compared List")
            }  
            else if (state.addToCompare?.length >= 2){
                alert("Only two items are comparable")
             }

            else {
                
                const newCompare = { ...payload }
                state.addToCompare.push(newCompare)
        }
        localStorage.setItem("addedToCompare", JSON.stringify(state.addToCompare));
    },
        removeFromCompare: (state, { payload }) => {
            // state.addToCompare = state.addToCompare.filter(cart => cart.id !== payload.id);
            const newItems = state.addToCompare.filter(item => item._id !== payload._id)
            state.addToCompare = newItems
            localStorage.setItem("addedToCompare", JSON.stringify(state.addToCompare));
        }
    }
    
});

export const { addToCompare, removeFromCompare} = compareSlice.actions;

export default compareSlice.reducer;