import React from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);

const NewArrival = ({mobile}) => {
    const { _id, name, price, image } = mobile;
    return (
        <div>
            <Swiper 
    slidesPerView={3} spaceBetween={30} slidesPerGroup={3} loop={true} loopFillGroupWithBlank={true} pagination={{
  "clickable": true
}} navigation={true} className="mySwiper">
            <SwiperSlide>
             <div className="rounded text-center">
                        <div className='card-hover border-0 h-100'>
                        <Link to={`/mobile/${_id}`}><img style={{ height: "12rem" }} src={image} className="img-fluid" alt="" /></Link> 
                            <p className="text-danger">{name}</p>
                            <p>Tk: <span className="text-danger fw-bold">{price}</span></p>
                        </div>
                    </div>
            </SwiperSlide>
  </Swiper>

            
        </div>
    );
};

export default NewArrival;