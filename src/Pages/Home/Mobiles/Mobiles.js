/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
// import useCart from '../../../Hooks/useCart/useCart';
import usePhones from '../../../Hooks/usePhones/usePhones';
// import { addToDb } from '../../../utilities/fakedb';
import Mobile from './Mobile';

const Mobiles = () => {
    const [mobiles] = usePhones();

    // const [addCart, setAddCart] = useCart();


    
   /*  const handleAddToCart = (mobile) => {
        const exists = addCart.find(pd => pd.key === mobile.key);
        let newCart = [];
        if (exists) {
            const rest = addCart.filter(pd => pd.key !== mobile.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, mobile];
        }
        else {
            mobile.quantity = 1;
            newCart = [...addCart, mobile];
        }
        setAddCart(newCart);
        // save to local storage (for now)
        addToDb(mobile.key);

    } */
    return (
        <>
            <div className="container mt-5">
                <div className="text-center pt-2">
                    <h1 className=" fw-bold text-primary p-2">Feature Mobile</h1>
                </div>
                <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
                    {mobiles.length == 0 ?
                        <div className="w-100 text-center">
                            <CircularProgress />
                        </div>
                        :
                        mobiles.slice(0, 16).map(mobile => <Mobile
                            key={mobile._id}
                            mobile={mobile}
                            /* cart ={cart}
                            setCart={setCart}
                            handleAddToCart={handleAddToCart} */
                        />)
                    }
                </div>
                <div className="text-center pt-4">
                    <Link to="/mobiles"><button className="btn btn-cart rounded-pill mb-5">View All</button></Link>
                </div>
            </div>
        </>
    );
};

export default Mobiles;