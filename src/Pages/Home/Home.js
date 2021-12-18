import React from 'react';
import Banner1 from '../Banner/Banner1';
import Banner2 from '../Banner/Banner2';
import Banner3 from '../Banner/Banner3';
import Mobiles from './Mobiles/Mobiles';

const Home = () => {
    return (
        <div style={{overflowX:"hidden"}} >
            <Banner1 />
            <Banner2/>
            <Mobiles />
            <Banner3/>
        </div>
    );
};

export default Home;