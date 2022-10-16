import { Box, Rating, Typography } from "@mui/material";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineCompareArrows, MdAddShoppingCart, MdOutlineFavoriteBorder } from "react-icons/md";
// import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
import Review from "../../../Dashboard/User/Review";
// import useAuth from "../../../Hooks/useAuth/useAuth";
import Footer from "../../../Shared/Footer/Footer";
import Header from "../../../Shared/Header/Header";
import Banner3 from "../../Banner/Banner3";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";
import { addToFvrt } from "../../../Redux/slices/fvrtSlice";
import { addToCompare } from '../../../Redux/slices/compareSlice';
import usePhones from "../../../Hooks/usePhones/usePhones";
import useReviews from "../../../Hooks/useReviews/useReviews";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { numberFormat } from "../../../Shared/numberFormat";
import moment from "moment";
import { Helmet } from "react-helmet";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const SingleMobile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  //   const { user, admin } = useAuth();

  const { id } = useParams();

  const [phones, setPhones] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    try {
      async function callApi() {
        let data = await fetch(
          `https://peaceful-shore-84874.herokuapp.com/mobiles/${id}`
        );
        data = await data.json();
        setPhones(data);
      }
      callApi();
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  const{name,price,ram,storage,brand,image,body,released_at,camera_pixels}=phones;
  // display_size,display_resolution,video_pixels,chipset,battery_size,battery_type
  // const {Technology,Speed,Announced, Status, Dimensions,Weight,SIM,Type,Size,Resolution,Protection,CPU,Card_slot, Internal, Dual,Features,Video,Single,Loudspeakers,WLAN, Bluetooth,GPS,USB,NFC,Sensors,Colors,Models } = specifications;

  /*  Filter related products */

  const [mobiles] = usePhones();

  const relatedPd = mobiles?.filter((brand) => brand?.brand === phones?.brand);
  //   console.log(relatedPd);

  /* Filter Rating & Reviews */

  const [reviews] = useReviews();

  const filterReview = reviews?.filter(
    (review) => review?.mobile === phones?.name
  );
  //   console.log(filterReview);

  const total = filterReview.reduce(
    (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
    0
  );
  const avg = (total / filterReview?.length).toFixed(1);

  const starV = filterReview?.filter((star) => star?.rating === 5);
  const total5star = starV.reduce(
    (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
    0
  );
  const avg5star = (total5star / starV?.length).toFixed(1);

  const starIV = filterReview?.filter(
    (star) => star?.rating < 5 && star?.rating >= 4
  );
  const total4star = starIV.reduce(
    (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
    0
  );
  const avg4star = (total4star / starIV?.length).toFixed(1);

  const star3 = filterReview?.filter(
    (star) => star?.rating < 4 && star?.rating >= 3
  );
  const total3star = star3.reduce(
    (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
    0
  );
  const avg3star = (total3star / star3?.length).toFixed(1);

  const star2 = filterReview?.filter(
    (star) => star?.rating < 3 && star?.rating >= 2
  );
  const total2star = star2.reduce(
    (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
    0
  );
  const avg2star = (total2star / star2?.length).toFixed(1);

  const starI = filterReview?.filter(
    (star) => star?.rating < 2 && star?.rating >= 1
  );
  const totalIstar = starI.reduce(
    (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
    0
  );
  const avgIstar = (totalIstar / starI?.length).toFixed(1);

  /*     // post order

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();

        axios.post(`https://peaceful-shore-84874.herokuapp.com/orders`, data)
            .then(res => {
                if (res.data.insertedId) {
                    // alert('Purchase successfully.Please Check My Order');
                    Swal.fire(
                        'Purchase successfully!',
                        'Please Check My Order on dashboard',
                        'success'
                      )
                    reset();
                }
            })
    } */

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Phono | ${name}`}</title>
        <link rel="canonical" href="/" />
      </Helmet>

      <Header />
      <div style={{ backgroundColor: "#EEF2FF", overflowX:"hidden" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 m-auto col-sm-12 mb-5">
            <div className="text-center">
              <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 pb-2"
      >
        <SwiperSlide>
          <img className="w-100 img-fluid" src={image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100 img-fluid" src={image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100 img-fluid" src={image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100 img-fluid" src={image} alt="" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img style={{height:"4rem"}} src={image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{height:"4rem"}} src={image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{height:"4rem"}} src={image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{height:"4rem"}} src={image} alt="" />
        </SwiperSlide>
      </Swiper>
             
            </div>
          </div>
         {/*  <div className="col-md-3">
            <ul>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.os}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i>{phones?.ram} {phones?.storage}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.display_size}" {phones?.display_resolution}
              </li>
            </ul>
          </div> */}
          {/* <div className="col-md-3">
            <ul>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.battery_type} {phones?.battery_size}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.camera_pixels}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.video_pixels}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.body} {phones?.chipset}
              </li>
            </ul>
          </div> */}
          <div className="col-md-6 border-start d-flex justify-content-center">
            <div className="py-3">
              <div>
              <h3 style={{ color: "#62599F" }}>{name}-{ram}-{storage}-{camera_pixels} Camera</h3>
              <h5 className="fs-6">
                Brand:
                <span className="fs-5 text-dark fw-bold"> {brand}</span>
              </h5>
              </div>
             <br />
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={Number(phones?.star)}
                    readOnly
                  />
                  <span> {phones?.rating} reviews</span>
              </Box>
              <div>
                <h5 className="w-100 py-3">
                <span className="text-danger fw-bold"> Tk </span>
                <span className="fs-1 fw-bold ">{numberFormat (price).slice(3,-3)}</span> .00
              </h5>

              <button onClick={() => dispatch(addToCart(phones))} className="btn btn-custom rounded w-100 mx-2"> Add to cart </button>
              <br />
              <br />

              <button
                onClick={() => dispatch(addToFvrt(phones))}
                className="btn btn-custom-2 rounded w-100 mx-2"
              >
                
                <i title="Add to Favourite" className="far fa-heart"></i> Add to
                wishlist
              </button>
              </div>
            </div>
          </div>
          {/* <div className="py-5">
              <span style={{textAlign: "justify"}}> <span style={{color:"#eb5525"}} className='fw-bold fs-5'> Disclaimer : </span> The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery.</span>
          </div> */}



<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="FAQ" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <div>
            <small>Specification of <span className="text-primary fs-5">{name}</span></small> <br />
          </div>
           <br />
          <div>
          <span>Network :</span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Technology : {phones?.specifications?.Technology}</li>
            <li>2G : {phones?.specifications?.TwoG}</li>
            <li>3G : {phones?.specifications?.ThreeG}</li>
            <li>4G : {phones?.specifications?.FourG}</li>
            <li>5G : {phones?.specifications?.FiveG}</li>
            <li>Speed : {phones?.specifications?.Speed}</li>
          </ul>
        </div>
        <div>
          <span>Launch :</span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Announced : {phones?.specifications?.Announced}</li>
            <li>Launch : {released_at}</li>
          </ul>
        </div>
        <div>
          <span>Body :</span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Dimensions : {phones?.specifications?.Dimensions}</li>
            <li>Body : {body}</li>
            <li>Body Weight : {phones?.specifications?.Weight}</li>
            <li>SIM : {phones?.specifications?.SIM}</li>
          </ul>
        </div>
        <div>
          <span>Display : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Size : {phones?.specifications?.Size}</li>
            <li>Resolution : {phones?.specifications?.Resolution}</li>
            <li>Protection : {phones?.specifications?.Protection}</li>
          </ul>
        </div>
        <div>
          <span>Platform : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>OS : {phones?.specifications?.OS}</li>
            <li>OS Version: {phones?.specifications?.Chipset}</li>
            <li>CPU : {phones?.specifications?.CPU}</li>
            <li>GPU : {phones?.specifications?.GPU}</li>
          </ul>
        </div>
        <div>
          <span>Mrmory : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Ram : {ram}</li>
            <li>Memory : {storage}</li>
          </ul>
        </div>
        <div>
          <span>Camera : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Primary : {phones?.specifications?.Dual}</li>
            <li>Secondary : {phones?.specifications?.Single}</li>
            <li>Video : {phones?.specifications?.Video}</li>
            <li>Flash : {phones?.specifications?.Features}</li>
          </ul>
        </div>
        <div>
          <span>Connectivity : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Wi-Fi : {phones?.specifications?.WLAN}</li>
            <li>Bluetooth : {phones?.specifications?.Bluetooth}</li>
            <li>GPS : {phones?.specifications?.GPS}</li>
            <li>USB : {phones?.specifications?.USB}</li>
          </ul>
        </div>
        <div>
          <span>Features : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Sensors : {phones?.specifications?.Sensors}</li>
            <li>Radio : {phones?.specifications?.Radio}</li>
            <li>NFC : {phones?.specifications?.NFC}</li>
            <li>Loudspeaker : {phones?.specifications?.Loudspeaker}</li>
          </ul>
        </div>
        <div>
          <span>Battery : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Battery : {phones?.specifications?.Type}</li>
            <li>Charging : {phones?.specifications?.Charging}</li>
            <li>Lasting : {phones?.specifications?.BatteryLife}</li>
          </ul>
        </div>
        <div>
          <span>Colors : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Colors : {phones?.specifications?.Colors}</li>
          </ul>
        </div>
        <div>
          <span>Models : </span>
          <ul style={{ listStyleType: 'disc', fontSize:"13px" }}>
            <li>Models : {phones?.specifications?.Models}</li>
          </ul>
        </div>
        </div>
       
      </TabPanel>
      <TabPanel value={value} index={1}>
         <div className="py-4">
           <div>
              <p>Ratings & Reviews of {name}</p>
           </div>
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <div className="d-flex justify-content-evenly">
                  <div className="py-4 m-auto">
                    <h1 className="fw-bold">
                      {avg} <span className="fs-4 text-secondary">/5</span>
                    </h1>
                    <Rating
                      size="large"
                      name="half-rating-read"
                      value={Number(avg)}
                      precision={0.1}
                      readOnly
                    />
                    <br />
                    <small>{filterReview?.length} Ratings</small>
                  </div>

                  <div className="py-4 m-auto">
                    <div>
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg5star)}
                        precision={1}
                        readOnly
                      />
                      <span> ({starV?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg4star)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({starIV?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg3star)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({star3?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg2star)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({star2?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avgIstar)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({starI?.length})</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <Review phones={phones} />
                </div>
            </div>
          </div>
          <div className="py-3">
        <h4 className="py-3"> {name} Reviews</h4>
        <div>
          {filterReview?.map((review) => (
            <div key={review?._id}>
              <ul className="list-group">
                <li className="list-group-item d-md-flex justify-content-between align-items-center">
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      name="half-rating-read"
                      precision={0.5}
                      size="small"
                      value={Number(review?.rating)}
                      readOnly
                    />
                    <br />
                    <small className="text-secondary">by {review?.name} </small>
                    <br />
                    <p>{review?.description}</p>
                    {/*  <img
                            style={{ width: "5vw" }}
                            className="img-fluid"
                            src={review?.image}
                            alt=""
                          />  */}
                  </Box>

                  <span className="text-secondary">
                    <small> { moment(new Date(review?.date)).fromNow() }</small>
                  </span>
                </li>
                <br />
              </ul>
            </div>
          ))}
        </div>
        
      </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h5>Coming Soon...</h5>
      </TabPanel>
    </Box>


         
      
        </div>
      </div>
      {/* <div className="py-1 rounded">
                            <div>
                                {
                                    phones?.name && <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
                                        <input defaultValue={phones?.name} readOnly {...register("mobile", { required: true })} />
                                        {errors.resort && <span className="text-warning">This field is required. </span>}
                                        <input defaultValue={phones?.price} readOnly {...register("price")} />
                                        <input defaultValue="Pending..." readOnly hidden {...register("status")} />
                                        <input defaultValue={user?.displayName} readOnly {...register("name")} />
                                        <input defaultValue={user?.email} readOnly {...register("email", { required: true })} />
                                        {errors.email && <span className="text-warning">This field is required.</span>}
                                        <input placeholder="Present Address"  {...register("address")} />
                                        <input placeholder="City and Country"  {...register("city")} />
                                        <input placeholder="Phone number"  {...register("phone", { required: true })} />
                                        {errors.phone && <span className="text-warning">This field is required.</span>}
                                        <input defaultValue={phones?.image} hidden readOnly {...register("image", { required: true })} />
                                        {errors.image && <span className="text-warning">This field is required.</span>} <br />
                                        {!admin && <Button className='w-100 btn-custom' type="submit" variant="contained">ORDER</Button>}

                                    </form>
                                }
                            </div>
                        </div> */}
                        <div>  
                        {relatedPd?.length ? (
        <div className="container pb-5">
          <h2 className="text-center fw-bold">
            
            <span style={{ color: "#eb5525" }} className="border-bottom">
              Related Mobiles
            </span>
          </h2>
          <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
            {relatedPd?.map((related) => (
              <div key={related?._id}>
                <div className="col rounded text-center">
                <div className="card border-0 shadow-sm h-100">
                   
                   <div className='card-hover rounded py-3'>
                          <div>  
                           <Link style={{textDecoration:"none"}} to={`/mobile/${related?._id}`}>
                             <img style={{ height: "10rem" }} src={related?.image} className="img-fluid rounded-start" alt="" />
                           <h6 className="text-dark pt-1">{related?.name}</h6>
                           <div style={{ textAlign: "center" }} className="px-2">
                               <p className="text-secondary">{related?.ram} {related?.storage} | {related?.chipset}</p>
                               <p style={{color:"#eb5525",fontWeight:"bolder"}}>{numberFormat(related?.price).slice(3,-3) }Tk</p>
                           </div> 
                           </Link>
                          </div>  
                       </div>
                       <div>
                           <div className="d-flex justify-content-evenly">
                           <button onClick={() => dispatch(addToCart(related))} className='btn btn-cart border-0 my-2 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button>

                          <button onClick={() => dispatch(addToFvrt(related))} className='btn btn-cart border-0 my-2 rounded'> <MdOutlineFavoriteBorder title='Add to Favourite' className="fs-3 p-1"/> </button>

                          <button onClick={() => dispatch(addToCompare(related))} className='btn btn-cart border-0 my-2 rounded'><MdOutlineCompareArrows title="Add to Compare" className='fs-3 p-1'/></button>
                           </div>
                       </div>
               </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        " "
      )}
      </div>

      <div className="bg-light py-3">
        <Banner3 />
      </div>
        <div>
           <Footer />
        </div>
     
    </div>
    </>
  );
};

export default SingleMobile;
