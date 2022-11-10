import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotal,
  clearCart,
} from "../../../Redux/slices/cartSlice";
import Header from "../../../Shared/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../Shared/Footer/Footer";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useOrders from "../../../Hooks/useOrders/useOrders";
import {Helmet} from "react-helmet";
import useUser from "../../../Hooks/useUser/useUser";
import { numberFormat } from "../../../Shared/numberFormat";
import useCoupons from "../../../Hooks/useCoupons/useCoupons";

const PlaceOrder = () => {

  const { user } = useAuth();
  const [orders] = useOrders();
  const [users]= useUser();
  const [coupons] = useCoupons();
  // console.log(coupons);
  // console.log(users);
  // const userOrder = orders.find(order => order.email === user?.email);
  // console.log(orders[0]?.email);
  const dispatch = useDispatch();
  const { addToCart, cartTotal, cartTotalQuantity, shipping, tax, delivery } =
    useSelector((state) => state.cart);
  useEffect(() => {
    if (addToCart.length >= 0) {
      dispatch(getTotal());
    }
  }, [addToCart, dispatch]);

  let navigate = useNavigate();

 // *--coupn applied section--*
const validate = new Date().toDateString();
const expireCoupon = new Date(validate).getMonth();

const voucher =  coupons?.filter(element => 
( new Date(element?.endDate).getMonth() === expireCoupon)
 );
// console.log(voucher[0]?.percentage);
 
  const [coupn, setCoupn] = useState("");
// console.log(coupn);
  const getInputValue = (event)=>{
    const userValue = event.target.value;
    if (userValue === voucher[0]?.code){
      const cpnT = (cartTotal - (cartTotal*(voucher[0]?.percentage)/100));
     setCoupn(cpnT);
    }
};

// *--Tracking No.--*
let trace = Math.floor(Math.random() * 10000);
let traceId = Math.floor(Math.random() * 10001);
let tracking = "SMR-PHONO-" + traceId + trace;
  
// *--post order--*
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.date = new Date().toDateString();
    data.time = new Date().toLocaleTimeString();
    data.email = user.email;
    data.userImage = user.photoURL;
    // data.orderBy = users[0]?.name ? users.name : user.displayName;
    data.tracking = tracking;
    data.orderItems = addToCart;
    data.items = addToCart?.length;
    data.quantity = cartTotalQuantity;
    data.subtotal = coupn ? coupn : cartTotal;
    data.shipping = shipping;
    data.tax = tax;
    data.total = (coupn ? coupn : cartTotal) + shipping + tax;
    data.delivery = delivery;
    data.coupn = coupn ? voucher[0]?.code : "No"
    data.status = "Pending...";

    axios
      .post(`https://phono-server-production.up.railway.app/orders`, data)
      .then((res) => {
        if (res.data.insertedId) {
          // alert('Purchase successfully.Please Check My Order');
          Swal.fire(
            "Purchase successfully!",
            "Please Check My Order on dashboard",
            "success"
          );
          reset();
          dispatch(clearCart(addToCart));
          navigate(`/dashboard/myOrders`);
        }
      });
  };

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Cart : Place Order</title>
                <link rel="canonical" href="/placeOrder" />
            </Helmet>
    <Header />
    <div style={{ backgroundColor: "#EEF2FF" }}>
      <div className="container">
        {
          users?.map(usrD=>(
           <div key={usrD?._id} className="row">
        
          <div className="col-md-6 col-sm-12">
            <div className="my-5 p-2 bg-light rounded">
              <h3 className="text-center fw-bold text-navi">Order Summary</h3>
              <ul className="list-group">
                {addToCart.map((mobile) => (
                  <li
                    key={mobile?._id}
                    className="list-group-item d-flex justify-content-between align-items-center border-0"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {
                          mobile?.os ? <Link title="See Details" to={`/mobile/${mobile?._id}`}> <img
                            style={{ width: "3rem" }}
                            className="img-fluid"
                            src={mobile?.image}
                            alt=""
                          />
                        </Link>:
                            <Link title="See Details" to={`/mobile2/${mobile?._id}`}><img
                            style={{ width: "3rem" }}
                            className="img-fluid"
                            src={mobile?.image}
                            alt=""
                          />
                        </Link>
                        }
    
                      </div>
                      <div className="px-3 text-center">
                        <p>
                          {mobile?.name} <br />
                          <span className="text-secondary">
                            <small>{mobile?.brand} </small>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <small className="text-secondary">
                        <span>{mobile?.cartQuantity}</span> x{" "}
                        <span>{numberFormat(mobile?.price).slice(3,-3)}&#x9F3;</span>
                      </small>
                    </div>
                    <span className="text-primary fw-bold fs-6">
                      {numberFormat(mobile?.price * mobile?.cartQuantity).slice(3,-3)} Tk
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center fs-5 border">
                  Total Items
                  <span className="text-primary fw-bold fs-5">
                    {addToCart?.length}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Items Quantity
                  <span className="text-primary fw-bold fs-5">
                    {cartTotalQuantity}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Subtotal
                  <span className="text-primary fw-bold fs-5">
                    {numberFormat(coupn ? coupn : cartTotal).slice(3,-3)} Tk
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Tax
                  <span className="text-primary fw-bold fs-5">
                    {numberFormat(tax).slice(3)} Tk
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Shipping Fee
                  <span className="text-primary fw-bold fs-5">
                    {shipping} Tk
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-4 fw-bold">
                  Total
                  <span className="text-danger fw-bold fs-5">
                    {numberFormat((coupn ? coupn : cartTotal) + shipping + tax).slice(3)} Tk
                  </span>
                </li>
                <br />
                        <div className="input-group input-group-lg">
                        {
                          coupn ?  <input disabled type="text" placeholder="Coupn aplied" className="form-control" /> : <input type="text" onChange={getInputValue} placeholder ={`Apply "${voucher[0]?.code}" to get ${voucher[0]?.percentage}% discount`} className="form-control" />
                        }
                           {
                            coupn ? <span disabled className="btn btn-secondary"> Applied</span> : <span className="btn-pink btn">Apply</span>
                           } 
                           
                        </div>
                        <br />
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="my-5 p-2 rounded">
              <h4 className="fw-bold text-navi">SHIPPING & BILLING INFORMATION</h4>
              <div className="d-flex justify-content-between pb-2">
                <span>
                  by {delivery}
                </span>
                <span>
                {numberFormat((coupn ? coupn : cartTotal) + shipping + tax).slice(3)} Tk
                </span>
              </div>
              {user.email && (
                <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
                  <input defaultValue={usrD.name ? usrD.name : user?.displayName} {...register("orderBy", {required:true})} readOnly />
                  <input defaultValue={usrD.address ? usrD.address : orders[0]?.address ? orders[0].address : ""} {...register("address", { required: true })}  placeholder="Present Address" />
                  <input defaultValue={usrD.city ? usrD.city : orders[0]?.city ? orders[0].city : ""} {...register("city", {required:true})} placeholder="City" />
                  <input defaultValue={usrD.phone ? usrD.phone : orders[0]?.phone ? orders[0].phone : ""} {...register("phone", {required:true})} placeholder="Phone number"/>
                  <input defaultValue={user?.email} readOnly />

                  <br />
                  {addToCart.length ? (
                    <button
                      className="w-100 btn btn-purple btn-lg"
                      type="submit"
                    >
                      Place Order
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-100 btn-lg btn btn-purple"
                      type="submit"
                    >
                      Place Order
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div> 
          ))
        }
        
      </div>
      <Footer />
    </div>
    </>
    
  );
};

export default PlaceOrder;
