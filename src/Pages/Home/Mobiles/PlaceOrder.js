import React, { useEffect } from "react";
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

const PlaceOrder = () => {
  const { user } = useAuth();
  const [orders] = useOrders();
  // const userOrder = orders.find(order => order.email === user?.email);
  console.log(orders[0]?.email);
  const dispatch = useDispatch();
  const { addToCart, cartTotal, cartTotalQuantity, shipping, tax } =
    useSelector((state) => state.cart);
  useEffect(() => {
    if (addToCart.length >= 0) {
      dispatch(getTotal());
    }
  }, [addToCart, dispatch]);

  let navigate = useNavigate();

  // post order

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.date = new Date().toDateString();
    data.time = new Date().toLocaleTimeString();
    data.email = user?.email;
    data.userImage = user?.photoURL;
    data.orderBy = user?.displayName;
    data.orderItems = addToCart;
    data.items = addToCart?.length;
    data.quantity = cartTotalQuantity;
    data.subtotal = cartTotal;
    data.shipping = shipping;
    data.tax = tax;
    data.total = cartTotal + shipping + tax;

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
          dispatch(clearCart(addToCart));
          navigate(`/dashboard/myOrders`);
        }
      });
  };

  return (
    <div style={{ backgroundColor: "#EEF2FF" }}>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="my-5 p-2 bg-light rounded">
              <h4 className="fw-bold">SHIPPING & BILLING INFORMATION</h4>
              {user?.email && (
                <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    defaultValue="Pending..."
                    readOnly
                    hidden
                    {...register("status")}
                  />
                  <input defaultValue={user?.email} readOnly />
                  <input defaultValue={user?.displayName} readOnly />

                  {user?.email === orders[0]?.email ? (
                    <div>
                      <input defaultValue={orders[0]?.address} {...register("address")} readOnly />
                      <input defaultValue={orders[0]?.city} {...register("city")} readOnly />
                      <input defaultValue={orders[0]?.phone} {...register("phone")} readOnly />
                    </div>
                  ) : (
                    <div>
                      <input
                        placeholder="Present Address"
                        {...register("address", { required: true })}
                      />
                      <input
                        placeholder="Area"
                        {...register("city", { required: true })}
                      />
                      <input
                        placeholder="Phone number"
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && (
                        <span className="text-warning">
                          This field is required.
                        </span>
                      )}
                    </div>
                  )}

                  <br />
                  {addToCart?.length ? (
                    <button
                      className="w-100 btn btn-custom btn-lg"
                      type="submit"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-100 btn-lg btn btn-custom"
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
                {addToCart.map((mobile) => (
                  <li
                    key={mobile?._id}
                    className="list-group-item d-flex justify-content-between align-items-center border-0"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {" "}
                        <Link title="See Details" to={`/mobile/${mobile?._id}`}>
                          {" "}
                          <img
                            style={{ width: "3rem" }}
                            className="img-fluid"
                            src={mobile?.image}
                            alt=""
                          />
                        </Link>
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
                        <span>{mobile?.price}</span>
                      </small>
                    </div>
                    <span className="text-primary fw-bold fs-6">
                      {mobile?.price * mobile?.cartQuantity} &#x9F3;
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
                    {cartTotal} &#x9F3;
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Shipping
                  <span className="text-primary fw-bold fs-5">
                    {shipping} &#x9F3;
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Tax
                  <span className="text-primary fw-bold fs-5">
                    {tax} &#x9F3;
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-4 fw-bold">
                  Total
                  <span className="text-danger fw-bold fs-5">
                    {cartTotal + shipping + tax} &#x9F3;
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
