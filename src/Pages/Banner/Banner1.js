import React from 'react';
import b1 from "../../images/banner4.jpg";
import b2 from "../../images/banner5.jpg";
import b3 from "../../images/cashback.jpg";
import b4 from "../../images/gadget.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay } from "swiper";

import "./Banner1.css";


const Banner1 = () => {

    return (
        <div>
            <div className="swiper">
                <Swiper
                    spaceBetween={30} 
                    centeredSlides={true}  
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}  
                      modules={[Autoplay]}
                      className="mySwiper">
                        {/* pagination={{
                        "clickable": true
                    }} */}
                    <SwiperSlide>

                            <img className='img-fluid w-100' src={b1} alt="" />
                          
                    </SwiperSlide>
                    <SwiperSlide>
                            <img className='img-fluid w-100' src={b2} alt="" />
                
                    </SwiperSlide>
                    <SwiperSlide>
                            <img className='img-fluid w-100' src={b3} alt="" />
                
                    </SwiperSlide>
                    <SwiperSlide>
                             <img className='img-fluid w-100' src={b4} alt="" />
                
                    </SwiperSlide>
                    </Swiper>
            </div>
        </div>
    );
};

export default Banner1;