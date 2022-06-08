import React,{useState} from 'react';
import usePhones from '../../../Hooks/usePhones/usePhones';
import Mobile from './Mobile';

const SortingMobile = () => {
    const [mobiles]=usePhones();
    const [priceH, setPriceH]=useState("");
    console.log(priceH);
    const sortHigh =()=>{
        const highPrice = mobiles?.sort((a,b)=>a.price<b.price ? 1 : -1);
        return highPrice;
    } 
    const handleHighPrice = ()=>{
        const hPrice = sortHigh();
        console.log(hPrice);
        setPriceH(hPrice.map(mobile => <Mobile
            key={mobile._id}
            mobile={mobile}
        />))
    }
    return (
        <div>
            <button onClick={handleHighPrice}>Price High</button>
        </div>
    );
};

export default SortingMobile;