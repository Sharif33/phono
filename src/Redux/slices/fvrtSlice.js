import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const fvrtSlice = createSlice({
    name: 'fvrt',
    initialState: {
        addToFvrt: localStorage.getItem("addedToFvrt") ? JSON.parse(localStorage.getItem('addedToFvrt') || '{}') : [],
        discover: [],
        removeFromFvrt: [],
        status: 'idle'
    },
    reducers: {
        addToFvrt: (state, { payload }) => {
            // state.addToFvrt.push(payload)

            const itemIndex = state.addToFvrt.findIndex(item => item._id === payload._id)  
            
            if (itemIndex >= 0) {
                toast.warning(`${payload.name} already in favourite`, {
                    position: "bottom-left",
                  });
            //      const newItems = state.addToFvrt.filter(item => item._id !== payload._id)
            // state.addToFvrt = newItems
            // window.confirm("Are you sure to remove fovorite")
            // localStorage.setItem("addedToFvrt", JSON.stringify(state.addToFvrt));
            } else {
                
                const newFvrt = { ...payload }
                state.addToFvrt.push(newFvrt);
                toast.success(`${payload.name} added to favourite`, {
                    position: "bottom-left",
                  });
        }
        localStorage.setItem("addedToFvrt", JSON.stringify(state.addToFvrt));
    },
        removeFromFvrt: (state, { payload }) => {
            // state.addToFvrt = state.addToFvrt.filter(cart => cart.id !== payload.id);
            const newItems = state.addToFvrt.filter(item => item._id !== payload._id)
            state.addToFvrt = newItems;
            toast.error(`${payload.name} remove from favourite`, {
                position: "bottom-left",
              });
            localStorage.setItem("addedToFvrt", JSON.stringify(state.addToFvrt));
        }
    }
    
});

export const { addToFvrt, removeFromFvrt} = fvrtSlice.actions;

export default fvrtSlice.reducer;