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
            {
                    var date = new Date();
                    var today = new Date();
                    var first = today.setDate(date.getDate()+ 2);
                    var last = today.setDate(date.getDate()+ 5);
                    const firstDay = (new Date(first).toDateString());
                    const lastDay = (new Date(last).toDateString());

                    // console.log("1st:", firstDay, "2nd:", lastDay);

                /* const months = [1,2,3,4,5,6,7,8,9,10,11,12]

                let month = months[date.getMonth()];
                // console.log(month);

                const getMonthName = (monthNumber) => {
                    date.setMonth(monthNumber - 1); 
                    return date.toLocaleString('en-US', { month: 'short' });
                }
                
                const deliveryFrom = (firstDay + " " + getMonthName(month));
                // console.log(deliveryFrom);
                const deliveryTo = (lastDay + " " + getMonthName(month) );
                // console.log(deliveryTo); */
                var delivery = firstDay.slice(3,-5) + " - "+ lastDay.slice(4);
                // console.log(delivery);
            };

const initialState = {
        addToCart: localStorage.getItem("addedToCart") ? JSON.parse(localStorage.getItem('addedToCart') || '{}') : [],
        cartTotal: 0,
        cartTotalQuantity: 0,
        // cartQuantity:0,
        shipping:0,
        tax:0,
        delivery: " ",
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

                if (state.addToCart[itemIndex].cartQuantity > 5) {
                    state.addToCart[itemIndex].cartQuantity = 5;
                    toast.warning(`Maximum purchase limit is 5`, {
                    position: "bottom-left",
                    }); 
                 } else{
                    toast.info(`Increased ${state.addToCart[itemIndex].name} quantity to ${state.addToCart[itemIndex].cartQuantity}`, {
                    position: "bottom-left",
                  });
                 }
               
                
            } 
            else {        
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
            toast.error(`${payload.name} remove from cart`, {
                position: "bottom-left",
              });
            localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));
        },
        increment: (state, { payload }) => {
            const itemIndex = state.addToCart.findIndex(item => item._id === payload._id);
            if(state.addToCart[itemIndex].cartQuantity >=0 && state.addToCart[itemIndex].cartQuantity < 5){
                state.addToCart[itemIndex].cartQuantity += 1; 
                   if(state.addToCart[itemIndex].cartQuantity >= 5){
                   toast.warning(`Maximum purchase limit is 5`, {
                position: "bottom-left",
              }); 
                }
            }
            localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));

        },
        decrement: (state,{ payload }) => {
            const itemIndex = state.addToCart.findIndex(item => item._id === payload._id)
            
            if (state.addToCart[itemIndex].cartQuantity > 1){
               state.addToCart[itemIndex].cartQuantity -= 1;
               
              /*  if(state.addToCart[itemIndex].cartQuantity <= 0){
                const newItems = state.addToCart.filter(item => item._id !== payload._id);
                state.addToCart = newItems;
                toast.error(`${payload.name} remove from cart`, {
                    position: "bottom-left",
                });
                localStorage.setItem("addedToCart", JSON.stringify(state.addToCart));
            } */
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
            total >= 100000 ? state.shipping = 0 : state.shipping = 100;
            state.cartTotal = total;
            state.cartTotalQuantity = quantity;
            state.delivery = delivery;
        },
        clearCart(state) {
            state.addToCart = []
            state.cartTotal = 0
            state.shipping = 0
            state.tax = 0
            toast.error(`Cart Cleared`, {
                position: "bottom-left",
              });
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