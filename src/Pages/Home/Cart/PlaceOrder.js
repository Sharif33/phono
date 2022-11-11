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
import { Button, FormHelperText, Grid,  InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Box } from "@mui/system";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const PlaceOrder = () => {

  const { user } = useAuth();
  const [orders] = useOrders();
  const [upAddress]= useUser();
  const [coupons] = useCoupons();

  // console.log(coupons);
  // console.log(upAddress[0]);
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
  const [cpn, setCpn] = useState("");
// console.log(coupn);
  const getInputValue = ()=>{ 
    if (cpn === voucher[0]?.code){
      const cpnT = (cartTotal - (cartTotal*(voucher[0]?.percentage)/100));
     setCoupn(cpnT);
     toast.success('Coupon Applied');
     setCpn('');
    }
    else{
      toast.error('Coupon not applicable');
    }
};
// console.log(getInputValue);

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
    <Box className='container' sx={{ flexGrow: 1}}>
            <Grid sx={{my:3}} container spacing={2}>
                <Grid item xs={12} md={6}>
              <h3 className="text-center fw-bold text-navi">Order Summary</h3>
              <TableContainer sx={{bgcolor:'#F4F8F9'}}>
                    <Table size="small">
                    <TableBody>
                    {addToCart?.map((item) => (
                      <TableRow
                      key={item?._id}
                      sx={{ border: 0 } }
                  >
                    <TableCell  sx={{ borderBottom: '1px solid #e9edf4' } }>
                    {
                          item.os ? <Link title="See Details" to={`/mobile/${item?._id}`}>
                          <img
                            style={{ width: "1.5rem" }}
                            src={item?.image}
                            alt=""
                          />
                        </Link> :
                        <Link title="See Details" to={`/mobile2/${item._id}`}>
                          <img
                            style={{ width: "2rem" }}   
                            src={item?.image}
                            alt=""
                          />
                        </Link>
                        }
                    </TableCell>
                    <TableCell  align="left"  sx={{ borderBottom: '1px solid #e9edf4' } }>
                                        {item?.name}
                                    <br />
                                        <small className='text-secondary'>
                                               &#x9F3;{numberFormat(item.price).slice(3,-3)}<AiOutlineClose/>{item?.cartQuantity} 
                                        </small>                                      
                                    </TableCell>
                    <TableCell  sx={{ borderBottom: '1px solid #e9edf4' } }>
                    &#x9F3;{numberFormat(item?.price * item?.cartQuantity).slice(3,-3)}
                    </TableCell>
                    </TableRow>
                    ))
                    }
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell sx={{ borderBottom: '1px solid #e9edf4' } } colSpan={1}>Total Items</TableCell>
            <TableCell sx={{fontWeight:'bold',borderBottom: '1px solid #e9edf4'}} align="left">{addToCart?.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell sx={{ borderBottom: '1px solid #e9edf4' } } colSpan={1}>Items Quantity</TableCell>
            <TableCell sx={{fontWeight:'bold',borderBottom: '1px solid #e9edf4'}} align="left">{cartTotalQuantity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell sx={{ borderBottom: '1px solid #e9edf4' } } colSpan={1}>Subtotal</TableCell>
            <TableCell sx={{fontWeight:'bold',borderBottom: '1px solid #e9edf4'}} align="left">&#x9F3;{numberFormat(coupn ? coupn : cartTotal).slice(3,-3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell sx={{ borderBottom: '1px solid #e9edf4' } } colSpan={1}>Tax</TableCell>
            <TableCell sx={{fontWeight:'bold',borderBottom: '1px solid #e9edf4'}} align="left">&#x9F3;{numberFormat(tax).slice(3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell sx={{ borderBottom: '1px solid #e9edf4' } } colSpan={1}>Shipping Fee</TableCell>
            <TableCell sx={{borderBottom: '1px solid #e9edf4'}} align="left">{shipping===0 ? <span><s style={{color:"red"}}>100&#x9F3;</s> FREE</span> 
            : <span> {shipping}&#x9F3; </span>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell sx={{ borderBottom: '1px solid #e9edf4' } } colSpan={2}>
            <Paper component="form"
      sx={{ display: 'flex', alignItems: 'center', width: '100%',border: '1px solid #e9edf4',boxShadow:0 }}>  
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={cpn}
        type='text'
        onChange={(e)=>setCpn(e.target.value)}
        placeholder="Enter coupon code"
      />
      
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {coupn ? <Button disabled variant="contained" sx={{ p: '10px',px:2 }}>Applied</Button>
      :
      <Button onClick={()=>getInputValue((coupn))} color='secondary' variant="contained" sx={{ p: '10px',bgcolor:'#183153',px:2 }}>
        Apply
      </Button>
      } 
    </Paper>
      <FormHelperText>{`Apply "${voucher[0]?.code}" to get ${voucher[0]?.percentage}% discount`} </FormHelperText>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0 } }/>
            <TableCell color="secondary" sx={{ border: 0 , fontWeight:'bold',color:"red", fontSize:'1.1em'} } colSpan={1}>Total</TableCell>
            <TableCell sx={{ border: 0, fontWeight:'bold',color:"red" } } align="left">&#x9F3;{numberFormat((coupn ? coupn : cartTotal) + shipping + tax).slice(3)}</TableCell>
          </TableRow>
                    </TableBody>
                    </Table>
                    </TableContainer>

                </Grid>
                <Grid item xs={12} md={6}>
<div className="mt-5 mb-2 p-2 rounded">
              <h5 className="fw-bold text-navi">SHIPPING & BILLING INFORMATION</h5>
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
                  <input defaultValue={upAddress[0]?.name ? upAddress[0].name : user?.displayName} {...register("orderBy", {required:true})} readOnly />
                  <input defaultValue={upAddress[0]?.address ? upAddress[0].address : orders[0]?.address ? orders[0].address : ""} {...register("address", { required: true })}  placeholder="Present Address" />
                  <input defaultValue={upAddress[0]?.city ? upAddress[0].city : orders[0]?.city ? orders[0].city : ""} {...register("city", {required:true})} placeholder="City" />
                  <input defaultValue={upAddress[0]?.phone ? upAddress[0].phone : orders[0]?.phone ? orders[0].phone : ""} {...register("phone", {required:true})} placeholder="Phone number"/>
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
                </Grid>
                
              </Grid>
    </Box>
      <Footer />
    </div>
    </>
    
  );
};

export default PlaceOrder;
