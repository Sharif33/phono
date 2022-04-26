import React from 'react';
import discount from "../../images/offers-icon.png";
import delivery from "../../images/free-deliver-icon.png";
import help from "../../images/support-icon.png";
import camera from "../../images/dualcamera.png";
import processor from "../../images/processor.png";
import ram from "../../images/ram.png";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Link } from 'react-router-dom';

SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);
const Banner2 = () => {
    const slide_img=[
"https://i.ibb.co/RYHwmwd/poco-m3.png",
"https://i.ibb.co/hBm3xGQ/neo2.png",
"https://i.ibb.co/3TVh3pN/mi-11x.png",
"https://i.ibb.co/mHNw97t/x-11t.png",
"https://i.ibb.co/sPSXGq8/v-y15.png",
"https://i.ibb.co/Bnr8jjT/v-x70pro.png",
"https://i.ibb.co/dWyJL69/v-x60pro.png",
"https://i.ibb.co/VmXyWHB/v-v21.png",
"https://i.ibb.co/MGGDbGd/r-narzo30.png",
"https://i.ibb.co/8swCDvC/r-gt-Master.png",
"https://i.ibb.co/GJrDxxB/r-c25y.png",
"https://i.ibb.co/MPQ8FtT/r-c21-y.png",
"https://i.ibb.co/LN1JtpQ/r-c11.png",
"https://i.ibb.co/mXC46c3/r-50i.png",
"https://i.ibb.co/C6z0nBP/r-25.png",
"https://i.ibb.co/2cbCrsN/r-8.png",
"https://i.ibb.co/K0WLpzt/poco-x3-pro.png"
    ]
    return (
        <div>
            <div className='row row-cols-1 row-cols-md-3 gx-2 p-3 bg-light'>
                <div className='col'>
                    <div className='d-flex justify-content-center align-items-center p-3'>
                    <img className='px-3 img-fluid' src={delivery} alt="" />
                        <div>
                            <h6 className='fw-bold'>FREE SHIPPING</h6>
                            <p>For orders over 50000tk</p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                <div className='d-flex justify-content-center align-items-center p-3'>
                        {/* <h1><i className="fas p-4 fa-truck"></i></h1> */}
                        <img className='px-3 img-fluid' src={discount} alt="" />
                        <div>
                            <h6 className='fw-bold'>OFFICIAL DISCOUNT</h6>
                            <p>Save Big on next product</p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                <div className='d-flex justify-content-center align-items-center p-3'>
                <img className='px-3 img-fluid' src={help} alt="" />
                        <div>
                            <h6 className='fw-bold'>24/7 HELPLINE</h6>
                            <p>Care till the end</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center my-5'>
                <div>
                    <h1>WHAT MAKES THE ESSENTIAL DIFFERENT?</h1>
                    <h5>EXPERIENCE HIGH PERFORMANCE AND SECURE</h5>
                </div>
                <div className='row row-cols-1 row-cols-md-3 gx-2 p-5'>
                <div className='col'>
                    <div className=''>
                    <img className='img-fluid' src={camera} alt="" />
                        <div className='py-2'>
                            <h6>PERFECT CUT</h6>
                            <h5>DUAL CAMERA</h5>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className=''>
                    <img className='img-fluid' src={processor} alt="" />
                        <div className='py-2'>
                            <h6>PRETTY</h6>
                            <h5>INTELLIGENT PROCESSING</h5>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className=''>
                    <img className='img-fluid' src={ram} alt="" />
                        <div className='py-2'>
                            <h6>MOST POPULAR</h6>
                            <h5>8GB DDR5 RAM</h5>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div>
                <div className='text-center pb-4'>
                    <h2>FIND YOUR PERFECT MATCH</h2>
                    <h5>EXPLORE AND FIND RIGHT ONE</h5>
                </div>
    <Swiper 
    slidesPerView={3} spaceBetween={20} slidesPerGroup={1} loop={true} loopFillGroupWithBlank={true} autoplay={{
        "delay": 2500,
        "disableOnInteraction": true
    }} pagination={{
  "clickable": true
}} navigation={true} className="mySwiper">
 {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
               <div className='p-4'>
               <Link to="/mobiles"> <img style={{width:"20rem"}} src={img} alt="" /></Link>
               </div>
   
            </SwiperSlide>
          );
        })}
  </Swiper>
            </div>
        </div>
    );
};

export default Banner2;