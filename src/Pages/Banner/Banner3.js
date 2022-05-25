/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Link } from 'react-router-dom';
SwiperCore.use([EffectCoverflow, Autoplay, Pagination, Navigation]);
const Banner3 = () => {
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones`)
            .then(res => res.json())
            .then(data => setPhones(data))
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
        modules={[Pagination, Navigation]}
    slidesPerGroup={1} loop={true} autoplay={{
        "delay": 2000,
        "disableOnInteraction": false
    }} navigation={true}
breakpoints={{
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  }}
className="mySwiper">
                        {phones.length == 0 ?
                            <div className="w-100 text-center">
                                <CircularProgress />
                            </div>
                            :
                            phones.slice(6,15).map(mobile => {
                                return (<SwiperSlide key={mobile?._id}>
                                    <div style={{overflowX:"hidden"}} >
                                    <div className='text-center m-2'>
                                        <div className='card-hover'>
                                        <Link to={`/mobile2/${mobile?._id}`}><img style={{ height: "12rem" }} src={mobile?.image} className="img-fluid" alt="" /></Link> 
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