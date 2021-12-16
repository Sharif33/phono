/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Mobile from './Mobile';

const ExploreMobiles = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/phones`)
            .then(res => res.json())
            .then(data => setMobiles(data))
    }, [])
    return (
        <>
            <div style={{ paddingTop: "65px" }} className='bg-light border border-bottom'> </div>
            <div className='bg-light'>
                <div className="container">
                    <div className="text-center pt-2">
                        <h2 className="fw-bold text-primary p-2">Feature Mobile</h2>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 m-2 g-4">
                        {mobiles.length == 0 ?
                            <div className="w-100 text-center">
                                <CircularProgress />
                            </div>
                            :
                            mobiles.map(mobile => <Mobile
                                key={mobile._id}
                                mobile={mobile}
                            />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExploreMobiles;