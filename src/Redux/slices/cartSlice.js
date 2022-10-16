import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// First, create the thunk
/* export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',
    async () => {
      const response = await fetch('https://redux-book-shelf.herokuapp.com/books').then(res=> res.json())
      return response.data
    }
) */

const initialState = {
        addToCart: localStorage.getItem("addedToCart") ? JSON.parse(localStorage.getItem('addedToCart') || '{}') : [],
        cartTotal: 0,
        cartTotalQuantity: 0,
        // cartQuantity:0,
        shipping:0,
        tax:0,
        discover: [],
        removeFromCart: [],
        status: 'idle'
    }


const cartSlice = createSlice({
    name: 'cart',
    initialState ,
    reducers: {
        addToCart: (state, { payload }) => {
            // state.addToCart.push(payload)

            const itemIndex = state.addToCart.findIndex(item => item._id === payload._id)  
            
            if (itemIndex >= 0) {
                state.addToCart[itemIndex] = {
                    ...state.addToCart[itemIndex],
                   cartQuantity: state.addToCart[itemIndex].cartQuantity += 1
                };

                toast.info(`Increased ${state.addToCart[itemIndex].name} quantity to ${state.addToCart[itemIndex].cartQuantity}`, {
                    position: "bottom-left",
                  });

            } else {        
                const newCart = { ...payload, cartQuantity: 1};
                state.addToCart.push(newCart);

                toast.success(`${payload.name} added to cart`, {
                    position: "bottom-left",
                  });
        }

        localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));
    },
        removeFromCart: (state, { payload }) => {
            // state.addToCart = state.addToCart.filter(cart => cart.id !== payload.id);
            const newItems = state.addToCart.filter(item => item._id !== payload._id);
            state.addToCart = newItems;
            localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));
        },
        increment: (state, { payload }) => {
            const itemIndex = state.addToCart.findIndex(item => item._id === payload._id);
            if(state.addToCart[itemIndex].cartQuantity >=0){
                state.addToCart[itemIndex].cartQuantity += 1;
               
            }
            
            localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));

        },
        decrement: (state,{ payload }) => {
            const itemIndex = state.addToCart.findIndex(item => item._id === payload._id)
            
            if (state.addToCart[itemIndex].cartQuantity > 1){
               state.addToCart[itemIndex].cartQuantity -= 1;
            }
            localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));
           
        },
        getTotal: (state) => {
            let { total, quantity } = state.addToCart.reduce((cartTotal, addToCart) => {

                const { price, cartQuantity } = addToCart;
                const itemTotal = Number(price * cartQuantity);
               
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
                return cartTotal;
            },
                {
                    total: 0,
                    quantity: 0,
                    shipping:0,
                    tax:0
                }
            );
            total = Number(total.toFixed(2));
            
            state.tax= (total * 0.05);
            total >= 50000 ? state.shipping = 0 : state.shipping = 50;
            state.cartTotal = total;
            state.cartTotalQuantity = quantity;
        },
        clearCart(state) {
            state.addToCart = []
            state.cartTotal = 0
            state.shipping = 0
            state.tax = 0
            localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));
        }
    }/* ,
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
          state.discover = action.payload;
          state.status = 'success'
        })
        builder.addCase(fetchBooks.pending, (state, action) => {
            state.status = 'pending';
        })
    }, */
    
});

export const { addToCart, removeFromCart, decrement, increment, getTotal, clearCart } = cartSlice.actions;

export default cartSlice.reducer;