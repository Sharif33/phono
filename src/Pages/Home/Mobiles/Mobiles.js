/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Mobile from './Mobile';

const Mobiles = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/phones`)
            .then(res => res.json())
            .then(data => setMobiles(data))
    }, [])
    return (
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
                        mobiles.slice(0, 6).map(mobile => <Mobile
                            key={mobile._id}
                            mobile={mobile}
                        />)
                    }
                </div>
                <div className="text-center pt-4">
                    <Link to="/mobiles"><button className="btn btn-outline-primary p-3 rounded-pill">View More</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Mobiles;