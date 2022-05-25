import { Box, Rating, Typography } from "@mui/material";
// import axios from "axios";
import React, { useEffect, useState } from "react";
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
import usePhones from "../../../Hooks/usePhones/usePhones";
import useReviews from "../../../Hooks/useReviews/useReviews";
import SwiperCore, {  Navigation, Thumbs  } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([ Navigation, Thumbs ]);
const SingleMobile = () => {
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
    <div style={{ backgroundColor: "#EEF2FF", overflowX:"hidden" }}>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="text-center">
              <h3 style={{ color: "#62599F" }}>{phones?.name}</h3>
              <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="pb-3"
      >
        <SwiperSlide>
          <img className="w-100 img-fluid" src={phones?.image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100 img-fluid" src={phones?.image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100 img-fluid" src={phones?.image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-100 img-fluid" src={phones?.image} alt="" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img style={{height:"4rem"}} src={phones?.image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{height:"4rem"}} src={phones?.image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{height:"4rem"}} src={phones?.image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{height:"4rem"}} src={phones?.image} alt="" />
        </SwiperSlide>
      </Swiper>
             
            </div>
          </div>
          <div className="col-md-3">
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
          </div>
          <div className="col-md-3">
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
          </div>
          <div className="col-md-3 border-start d-flex justify-content-center">
            <div className="py-3">
              <h5 className="fs-6">
                Brand:{" "}
                <span className="fs-5 text-dark fw-bold"> {phones?.brand}</span>
              </h5>
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Typography>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={Number(phones?.star)}
                    readOnly
                  />{" "}
                  {phones?.rating} reviews{" "}
                </Typography>
              </Box>

              <h5 className="w-100 py-3">
                <span className="text-danger fw-bold"> &#x9F3; </span>{" "}
                <span className="fs-1 fw-bold ">{phones?.price}</span> .00
              </h5>

              <button
                onClick={() => dispatch(addToCart(phones))}
                className="btn btn-custom rounded-0 w-100 mx-2"
              >
                Add to cart
              </button>
              <br />
              <br />

              <button
                onClick={() => dispatch(addToFvrt(phones))}
                className="btn btn-custom-2 rounded-0 w-100 mx-2"
              >
                {" "}
                <i title="Add to Favourite" className="far fa-heart"></i> Add to
                wishlist{" "}
              </button>
            </div>
          </div>
          {/* <div className="py-5">
              <h6 style={{textAlign: "justify"}}> <span style={{color:"#eb5525"}} className='fw-bold fs-5'> Disclaimer : </span> The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery.</h6>
          </div> */}
          <div className="py-4">
            <p>Ratings & Reviews of {phones?.name}</p>
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
                    />{" "}
                    <br />
                    <small>{filterReview?.length} Ratings</small>
                  </div>

                  <div className="py-4 m-auto">
                    <h4>
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg5star)}
                        precision={1}
                        readOnly
                      />{" "}
                      <span> ({starV?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg4star)}
                        precision={0.1}
                        readOnly
                      />{" "}
                      <span> ({starIV?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg3star)}
                        precision={0.1}
                        readOnly
                      />{" "}
                      <span> ({star3?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg2star)}
                        precision={0.1}
                        readOnly
                      />{" "}
                      <span> ({star2?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avgIstar)}
                        precision={0.1}
                        readOnly
                      />{" "}
                      <span> ({starI?.length})</span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <Review phones={phones} />
                </div>
            </div>
          </div>
      <div className="py-3">
        <h4 className="py-3"> {phones?.name} Reviews</h4>
        <div>
          {filterReview?.slice(0, 5).map((review) => (
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
                    <small> {review?.date}</small>
                  </span>
                </li>
                <br />
              </ul>
            </div>
          ))}
        </div>
        
      </div>
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
      {relatedPd?.length ? (
        <div className="container pb-5">
          <h2 className="text-center fw-bold">
            {" "}
            <span style={{ color: "#eb5525" }} className="border-bottom">
              Related Mobiles
            </span>{" "}
          </h2>
          <div className="row row-cols-1 row-cols-md-3 m-2 g-4">
            {relatedPd?.map((related) => (
              <div key={related?._id}>
                <div className="col rounded text-center">
                  <div className="card card-hover shadow h-100">
                    <div className="row flex-row-reverse px-3 py-2 g-0">
                      <div className="col-md-4">
                        <img
                          style={{ height: "12rem" }}
                          src={related?.image}
                          className="img-fluid rounded-start"
                          alt=""
                        />
                        <p>
                          Tk:{" "}
                          <span className="text-danger fw-bold">
                            {related?.price}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-8">
                        <h5 className="text-dark pt-1">{related?.name}</h5>
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Rating
                            name="half-rating-read"
                            precision={0.5}
                            size="small"
                            value={Number(related?.star)}
                            readOnly
                          />
                        </Box>
                        <div style={{ textAlign: "justify" }} className="p-2">
                          <p className="text-secondary">{related?.specs}</p>
                        </div>
                        <div className="text-center d-flex justify-content-center alighn-items-center">
                          <Link to={`/mobile/${related?._id}`}>
                            {" "}
                            <button className="btn btn-outline-dark border-0 mx-2 rounded-circle">
                              {" "}
                              <i
                                title="Details"
                                className="fas fa-info-circle fs-4 py-1"
                              ></i>{" "}
                            </button>{" "}
                          </Link>

                          <button
                            onClick={() => dispatch(addToCart(related))}
                            className="btn btn-outline-dark border-0 mx-2 rounded-circle"
                          >
                            {" "}
                            <i
                              title="Add to Cart"
                              className="fas fa-cart-plus fs-4 py-1"
                            ></i>{" "}
                          </button>

                          <div>
                            <button
                              onClick={() => dispatch(addToFvrt(related))}
                              className="btn btn-outline-dark border-0 mx-2 rounded-circle"
                            >
                              {" "}
                              <i
                                title="Add To Favourite"
                                className="far fa-heart fs-4 py-1"
                              ></i>{" "}
                            </button>
                          </div>
                        </div>
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
      
      <div className="bg-light py-3">
        <Banner3 />
      </div>

      <Footer />
    </div>
  );
};

export default SingleMobile;
