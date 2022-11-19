import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { numberFormat } from '../../../Shared/numberFormat';
import { getTotal } from '../../../Redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartModal = () => {
    const dispatch = useDispatch();
    const { addToCart, cartTotal, shipping, tax, } = useSelector((state) => state.cart);

    // console.log(addToCart);

    React.useEffect(() => {
        dispatch(getTotal());
    }, [addToCart, dispatch]);
    return (
        <>
           {
            addToCart?.length ?
            <Link to={`/cart`}>   
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, position: 'fixed', top: '50%', right: 0,bottom:'auto' ,p:2,}} className='text-center bg-light'>
                <Button size='large' startIcon={<RiShoppingBag3Fill style={{ color: "#183153" }} />}><span className='text-secondary fw-bold'>{addToCart?.length}</span></Button><br />
                <Typography style={{ color: "#183153" }} variant='h6'>
                    &#x9F3;{numberFormat(Math.ceil(cartTotal + shipping + tax)).slice(3,-3)}
                </Typography>
        </Box>
        </Link>
        : " "
        } 
        </>
    );
};

export default CartModal;