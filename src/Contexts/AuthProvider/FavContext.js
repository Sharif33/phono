// import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
// import { useForm } from 'react-hook-form';
// import useAuth from '../../Hooks/useAuth/useAuth';

export const Favourite = createContext();

const FavContext = ({children}) => {
    const [cart, setCart] = useState([]);

    // const { user} = useAuth();

    // const { register, handleSubmit, formState: { errors } } = useForm();

    // const onSubmit = data => {
    //     data.date=new Date().toDateString();
    //     data.time=new Date().toLocaleTimeString();
    //     data.email=user?.email;

    //     axios.post(`https://peaceful-shore-84874.herokuapp.com/favorites`, data)
    //         .then(res => {
    //             if (res.data.insertedId) {
    //                 setCart(data);
    //             }
    //         })
    // }
   
    useEffect(() => {
        let isMounted = true;
        const cartItemsData = JSON.parse(localStorage.getItem('cartItems'))
        
        if (cartItemsData) {
            if(isMounted ){
                setCart(cartItemsData);
            }
        }
        return () => {
            isMounted = false;
            };
    }, [])
    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart))
    }, [cart])

    
    function addToCart(newItem) {
        setCart(prevItems => [...prevItems, newItem])
    }
    
    function removeFromCart(id) {
        setCart(prevItems => prevItems.filter(item => item.id !== id))
    }
    return (
        <Favourite.Provider value={{cart, setCart, addToCart, removeFromCart}}>
           {children}
       </Favourite.Provider>
    );
};

export default FavContext;