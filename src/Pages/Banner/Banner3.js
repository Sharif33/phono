import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Link } from 'react-router-dom';
SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);
const Banner3 = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones`)
            .then(res => res.json())
            .then(data => setMobiles(data))
    }, [])
    return (
        <>
        <div style={{overflowX:"hidden"}}></div>
        <div className='py-4 text-center'>
            <h5 className='fw-bold'>NEW ARRIVAL</h5>
            <hr />
            <p>FIND THE PERFECT PHONE FOR YOU</p>
        </div>
        <Swiper 
    slidesPerView={3} spaceBetween={10} slidesPerGroup={1} loop={true} loopFillGroupWithBlank={false} autoplay={{
        "delay": 2500,
        "disableOnInteraction": true
    }} pagination={{
  "clickable": true
}} navigation={true} className="mySwiper">
                        {mobiles.length == 0 ?
                            <div className="w-100 text-center">
                                <CircularProgress />
                            </div>
                            :
                            mobiles.slice(6,15).map(mobile => {
                                return (<SwiperSlide key={mobile?._id}>
                                    <div style={{overflowX:"hidden"}} >
                                    <div className='text-center m-2'>
                                        <div className='card-hover'>
                                        <Link to={`/mobile/${mobile._id}`}><img style={{ height: "12rem" }} src={mobile?.image} className="img-fluid" alt="" /></Link> 
                            <p className="text-dark fw-bold">{mobile?.name}</p>
                            <p>Tk: <span className="text-danger fw-bold">{mobile?.price}</span></p>
                                        </div>
                            </div>  
                            </div>      
                    </SwiperSlide>);    
                                     })}
  </Swiper>
        </>
    );
};

export default Banner3;