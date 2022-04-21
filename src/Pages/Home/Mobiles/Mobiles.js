/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../Hooks/useCart/useCart';
import usePhones from '../../../Hooks/usePhones/usePhones';
import { addToDb } from '../../../utilities/fakedb';
import Mobile from './Mobile';

const Mobiles = () => {
    const [mobiles,cart,setCart] = usePhones();

    const [addCart, setAddCart] = useCart();


    
    const handleAddToCart = (mobile) => {
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

    }
    return (
        <div className='bg-light'>
            <div className="container">
                <div className="text-center pt-2">
                    <h4 className="fw-bold text-primary p-2">Feature Mobile</h4>
                    <hr />
                </div>
                <div className="row row-cols-1 row-cols-md-2 m-2 g-4">
                    {mobiles.length == 0 ?
                        <div className="w-100 text-center">
                            <CircularProgress />
                        </div>
                        :
                        mobiles.slice(0, 6).map(mobile => <Mobile
                            key={mobile._id}
                            mobile={mobile}
                            cart ={cart}
                            setCart={setCart}
                            handleAddToCart={handleAddToCart}
                        />)
                    }
                </div>
                <div className="text-center pt-4">
                    <Link to="/mobiles"><button className="btn btn-outline-primary p-3 rounded-pill mb-5">View More</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Mobiles;