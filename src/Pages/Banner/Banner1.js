import React from 'react';
import b1 from "../../images/banner4.jpg";
import b2 from "../../images/banner5.jpg";
import b3 from "../../images/cashback.jpg";
import b4 from "../../images/gadget.jpg";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// import "./Banner1.css";
SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);

const Banner1 = () => {

    return (
        <div>
            <div className="main-swiper">
                <Swiper
                    spaceBetween={30} centeredSlides={true} autoplay={{
                        "delay": 5000,
                        "disableOnInteraction": false
                    }} pagination={{
                        "clickable": true
                    }} navigation={false} className="mySwiper">
                    <SwiperSlide>
                        <div className="text-center">
                            <img className='img-fluid' src={b1} alt="" />
                        </div>   
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="text-center">
                            <img className='img-fluid' src={b2} alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="text-center">
                            <img className='img-fluid' src={b3} alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="text-center">
                             <img className='img-fluid' src={b4} alt="" />
                    </div>
                    </SwiperSlide>
                    </Swiper>
            </div>
        </div>
    );
};

export default Banner1;