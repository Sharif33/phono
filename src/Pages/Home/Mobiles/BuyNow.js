import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {clearBuy} from "../../../Redux/slices/buyNowSlice";
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

const BuyNow = () => {
    const { user } = useAuth();
    const [orders] = useOrders();
    const [users]= useUser();
    // const userOrder = orders.find(order => order.email === user?.email);
    // console.log(orders[0]?.email);
    const dispatch = useDispatch();
    const { addToBuy} = useSelector((state) => state.buy);

    let subtotal = (addToBuy[0]?.price * addToBuy[0]?.cartQuantity)

    let shipping = 50;
    if((addToBuy[0]?.price * addToBuy[0]?.cartQuantity)>=50000 ){
        shipping = 0;
    }

    let tax = (addToBuy[0]?.price*0.05);
    let total = shipping + tax + (addToBuy[0]?.price * addToBuy[0]?.cartQuantity);

    let navigate = useNavigate();
  
    // post order
  
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
      data.orderItems = addToBuy;
      data.items = addToBuy?.length;
      data.quantity = addToBuy[0]?.cartQuantity;
      data.subtotal = subtotal ;
      data.shipping = shipping;
      data.tax = tax;
      data.total = total + shipping + tax;
      data.status = "Pending...";
  
      axios
        .post(`https://peaceful-shore-84874.herokuapp.com/orders`, data)
        .then((res) => {
          if (res.data.insertedId) {
            // alert('Purchase successfully.Please Check My Order');
            Swal.fire(
              "Purchase successfully!",
              "Please Check My Order on dashboard",
              "success"
            );
            reset();
            dispatch(clearBuy(addToBuy));
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
              <div className="my-5 p-2 rounded">
                <h4 className="fw-bold">SHIPPING & BILLING INFORMATION</h4>
                {user.email && (
                  <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={user?.email} readOnly />
                    <input defaultValue={usrD.name ? usrD.name : user?.displayName} {...register("orderBy", {required:true})} readOnly />
                    <input defaultValue={usrD.address ? usrD.address : orders[0]?.address ? orders[0].address : ""} {...register("address", { required: true })}  placeholder="Present Address" />
                    <input defaultValue={usrD.city ? usrD.city : orders[0]?.city ? orders[0].city : ""} {...register("city", {required:true})} placeholder="City" />
                    <input defaultValue={usrD.phone ? usrD.phone : orders[0]?.phone ? orders[0].phone : ""} {...register("phone", {required:true})} placeholder="Phone number"/>
  
                    <br />
                    {addToBuy.length ? (
                      <button
                        className="w-100 btn btn-purple btn-lg"
                        type="submit"
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-100 btn-lg btn btn-purple"
                        type="submit"
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    )}
                  </form>
                )}
              </div>
            </div>
  
            <div className="col-md-6 col-sm-12">
              <div className="my-5 p-2 bg-light rounded">
                <h3 className="text-center fw-bold">Order Summary</h3>
                <ul className="list-group">
                  {addToBuy.map((mobile) => (
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
                      {addToBuy?.length}
                    </span>
                  </li>
  
                  <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                    Items Quantity
                    <span className="text-primary fw-bold fs-5">
                      {addToBuy[0]?.cartQuantity}
                    </span>
                  </li>
  
                  <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                    Subtotal
                    <span className="text-primary fw-bold fs-5">
                      {numberFormat(subtotal).slice(3,-3)} Tk
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
                      {numberFormat(total + shipping + tax).slice(3)} Tk
                    </span>
                  </li>
                </ul>
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

export default BuyNow;