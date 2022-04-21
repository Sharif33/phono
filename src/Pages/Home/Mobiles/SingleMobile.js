import { Box, Rating, Typography } from "@mui/material";
// import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import Review from "../../../Dashboard/User/Review";
// import useAuth from "../../../Hooks/useAuth/useAuth";
import Footer from "../../../Shared/Footer/Footer";
import Header from "../../../Shared/Header/Header";
import Banner3 from "../../Banner/Banner3";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";
import { addToFvrt } from "../../../Redux/slices/fvrtSlice";
import usePhones from "../../../Hooks/usePhones/usePhones";

const SingleMobile = () => {
  const dispatch = useDispatch();

  //   const { user, admin } = useAuth();

  const { id } = useParams();

  const [phones, setPhones] = useState([]);

  useEffect(() => {
    try {
      async function callApi() {
        let data = await fetch(
          `https://peaceful-shore-84874.herokuapp.com/phones/${id}`
        );
        data = await data.json();
        setPhones(data);
      }
      callApi();
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  //Filter related products

  const [mobiles] = usePhones();

  const relatedPd = mobiles?.filter((brand) => brand?.brand === phones?.brand);
//   console.log(relatedPd);

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
    <div style={{ backgroundColor: "#EEF2FF" }}>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="text-center">
              <h3 style={{ color: "#62599F" }}>{phones?.name}</h3>
              <img className="w-100 img-fluid" src={phones?.image} alt="" />
            </div>
          </div>
          <div className="col-md-3">
            <ul>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.processor}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.memory}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.display}
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.battery}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.camera}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.selfie}
              </li>
              <li className="mb-5 fs-5">
                <i className="fas fa-chevron-right"> </i> {phones?.network}
              </li>
            </ul>
          </div>
          <div className="col-md-3 border-start d-flex justify-content-center">
            {/* <Review phones={phones} /> */}
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
          <div className="py-5">
              <h6 style={{textAlign: "justify"}}> <span style={{color:"#eb5525"}} className='fw-bold fs-5'> Disclaimer : </span> The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery.</h6>
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
            <span style={{color:"#eb5525"}} className="border-bottom">Related Mobiles</span>{" "}
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
