import React from 'react';
import b1 from "../../images/banner1.jpg";
import b2 from "../../images/banner2.jpg";
import b3 from "../../images/banner3.jpg";
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
                        "delay": 2500,
                        "disableOnInteraction": false
                    }} pagination={{
                        "clickable": true
                    }} navigation={false} className="mySwiper">
                    <SwiperSlide>
                        <img className='img-fluid' src={b1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='img-fluid' src={b2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='img-fluid' src={b3} alt="" />
                    </SwiperSlide></Swiper>
            </div>
        </div>
    );
};

export default Banner1;