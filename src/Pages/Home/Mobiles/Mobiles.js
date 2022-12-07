/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import usePhones from '../../../Hooks/usePhones/usePhones';
import CartModal from '../Cart/CartModal';
import Mobile from './Mobile';

const Mobiles = () => {
    const [mobiles] = usePhones();

    return (
        <>
            <div className="container mt-5">
                <div className="text-center pt-2">
                    <h1 className=" fw-bold text-primary p-2">Feature Mobile</h1>
                </div>
                <CartModal/>
                <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
                    {mobiles.length == 0 ?
                        <div className="w-100 text-center">
                            <CircularProgress />
                        </div>
                        :
                        mobiles.slice(0, 16).map(mobile => <Mobile
                            key={mobile._id}
                            mobile={mobile}
                        />)
                    }
                </div>
                <div className="text-center pt-4">
                    <Link to="/mobiles"><button className="btn btn-lg btn-cart rounded-0 mb-5">Load more</button></Link>
                </div>
            </div>
        </>
    );
};

export default Mobiles;