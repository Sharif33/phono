/* eslint-disable eqeqeq */
import { Avatar, CircularProgress, Rating } from '@mui/material';
import { RiDoubleQuotesL } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import CustomerReview from './CustomerReview';
import "./Reviews.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

// SwiperCore.use([EffectCoverflow, Autoplay, Pagination, Navigation]);
const CustomerReviewShow = () => {
    const [openReviewNow, setOpenReviewNow] = React.useState(false);
    const handleOpen = () => setOpenReviewNow(true);
    const handleClose = () => setOpenReviewNow(false);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://phono-server.vercel.app/cReviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <>
        <div style={{backgroundColor:"#EEF2FF"}}>
        <div className='container py-5' style={{overflowX:"hidden"}}>
        <div className='pb-5 text-start'>
            <h1 className='fw-bold'> <span>What <span className='text-primary'>our</span> </span> <br /> <span className='text-primary'>Customer</span>  say <span className='text-danger'>?</span></h1>
        </div>
        
        <Swiper 
         spaceBetween={30}
         effect={"coverflow"}
         grabCursor={true}
         centeredSlides={true}
         slidesPerView={"auto"}
         coverflowEffect={{
             rotate: 50,
             stretch: 0,
             depth: 100,
             modifier: 1,
             slideShadows: true,
         }}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
                 slidesPerView: 3,
                 spaceBetween: 50,
             },
         }}
         pagination={{
             el: ".swiper-pagination",
             clickable: true,
         }}
         modules={[EffectCoverflow, Autoplay, Pagination]}
         className="mySwiper"
        >
                        {reviews?.length == 0 ?
                            <div className="w-100 text-center">
                                <CircularProgress />
                            </div>
                            :
                            reviews?.map(review => {
                                return (<SwiperSlide key={review?._id}>
                                    <div >
                                        <div className='bg-light rounded py-3 p-2 rvw-margin'>
                                            <div className='d-flex justify-content-start align-items-center'>
                                                <div>
                                                     <Avatar alt="" src={review?.userImg} />
                                                </div>
                                                <div className='ms-2'>
                                                    <small className='text-dark'>{review?.name}</small> <br />
                                                    <span>
                                                    <Rating
                                                    style={{color:"#093843"}}
                                                    precision={0.5}
                                                    size="small"
                                                    value={Number(review?.rating)}
                                                    readOnly
                                                    />
                                                    </span>
                                                </div>
                                                <div className='quto'><RiDoubleQuotesL/></div>           
                                            </div>
                                       
                                        {/* <img style={{ height: "2rem" }} src={review?.userImg} className="img-fluid" alt="" /> */}
                                        <div className='m-auto'>
                                        <div className='p-2 r-desc'>     
                                        <span>{review?.description}</span>
                                        </div>
                                        </div>
                                     
                                    </div>
                                    </div>      
                                    </SwiperSlide>);    
                        })}
  </Swiper>
            
        </div>
        <div className='text-center'>
                <div>
                    <button onClick={handleOpen} className='btn btn-purple'>Review Us</button>
                </div>
                <div>
                    <CustomerReview handleClose={handleClose} openReviewNow={openReviewNow}/>
                </div>
            </div>
  </div>
        </>
    );
};

export default CustomerReviewShow;