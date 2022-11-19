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
// import useOrders from "../../../Hooks/useOrders/useOrders";
import { Helmet } from "react-helmet";
import useUser from "../../../Hooks/useUser/useUser";
import { numberFormat } from "../../../Shared/numberFormat";
import useCoupons from "../../../Hooks/useCoupons/useCoupons";
import { AppBar, Button, Checkbox, Divider, FormHelperText, Grid, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextareaAutosize, Toolbar, Typography } from '@mui/material';
import { Box } from "@mui/system";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import ShippingAddress from "../../../Dashboard/User/Addresses/ShippingAddress";
import AddNewAddress from "../../../Dashboard/User/Addresses/AddNewAddress";

const PlaceOrder = () => {
  const { user } = useAuth();
  let navigate = useNavigate();

 /*  ----Address Add---- */
  const defaultAdrs = useUser();
  // console.log(defaultAdrs);
  const [users, setUsers] = useState([]);
  const editedAdrs = { ...defaultAdrs, ...users };
  // console.log(editedAdrs);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (users.length === 0) {
      setIsLoading(true)
      fetch(`https://phono-server-production.up.railway.app/usersEmail/${user.email}`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .finally(() => setIsLoading(false))
    }
  }, [user.email, users.length]);

  const [newAddress, setNewAddress] = useState('');
  const [ordrNote, setOrdrNote] = useState('');
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  /* ---pd get--- */
  const dispatch = useDispatch();
  const { addToCart, cartTotal, cartTotalQuantity, shipping, tax, delivery } =
    useSelector((state) => state.cart);

    useEffect(() => {
    if (addToCart.length >= 0) {
      dispatch(getTotal());
    }
  }, [addToCart, dispatch]);

/* ---post pdItm to db--- */
  const [orderItems, setOrderItems] = useState();
  useEffect(() => {
    const orderItem = addToCart?.map(({ name, _id, price, cartQuantity, image, brand, os }) => {
      return ({ name, _id, price, cartQuantity, image, brand, os })
    });
    setOrderItems(orderItem)
  }, [addToCart]);

  // *--coupn applied section--*  
  
  const [coupons] = useCoupons();
  // console.log(coupons);
  const validate = new Date().toDateString();
  const expireCoupon = new Date(validate).getMonth();

  const voucher = coupons?.find(element =>
    (new Date(element?.endDate).getMonth() === expireCoupon)
  );

  const [coupn, setCoupn] = useState("");
  const [cpn, setCpn] = useState("");
  // console.log(coupn);

  const appliedCoupon = () => {
    if (cpn === voucher?.code) {
      const cpnT = (cartTotal - (cartTotal * (voucher?.percentage) / 100));
      setCoupn(cpnT);
      toast.success(`'${cpn}' Coupon Applied`);
      setCpn('');
    } else {
      cpn && toast.error(`'${cpn}' Coupon not applicable`);
      setCpn('');
    }
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      appliedCoupon();
      setCpn('');
      e.preventDefault();
    }
  }
  // console.log(appliedCoupon);

  // *--Tracking No.--*
  let trace = Math.floor(Math.random() * 10000);
  let traceId = Math.floor(Math.random() * 10001);
  let tracking = "SMR-PHONO-" + traceId + trace;

  // *--post order--*
  const {
    // register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.date = new Date().toDateString();
    data.time = new Date().toLocaleTimeString();
    data.email = user.email;
    data.userImage = user.photoURL;
    data.tracking = tracking;
    data.orderItems = orderItems;
    data.items = addToCart?.length;
    data.quantity = cartTotalQuantity;
    data.subtotal = coupn ? coupn : cartTotal;
    data.shipping = shipping;
    data.tax = tax;
    data.total = (coupn ? coupn : cartTotal) + shipping + tax;
    data.delivery = delivery;
    data.coupn = coupn ? voucher?.code : " ";
    data.status = "Pending...";
    data.orderBy = editedAdrs?.name ? editedAdrs?.name : defaultAdrs?.name ? defaultAdrs?.name : newAddress?.name;
    data.billingAddress = newAddress ? newAddress : editedAdrs ? editedAdrs : defaultAdrs;
    data.orderNote = ordrNote ? ordrNote : " ";

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
          console.log(data);
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
        <Box className='container' sx={{ flexGrow: 1 }}>
          <Grid sx={{ my: 3 }} container spacing={2}>
            <Grid item xs={12} md={7}>
              <div className="my-2 p-2 rounded">
                {/* <h5 className="fw-bold text-navi">SHIPPING & BILLING INFORMATION</h5> */}
                <ShippingAddress
                  editedAdrs={editedAdrs}
                  users={users}
                  setUsers={setUsers}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
                 
                  <Box>
                    <Box sx={{ display: 'flex', my: 2, alignItems: 'center' }}>
                      <Checkbox
                        color="secondary"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}>
                      </Checkbox>
                      <span>Different Billing Address</span>
                    </Box>
                    <Divider />
                    {checked &&
                      <AddNewAddress
                      newAddress={newAddress}
                      setNewAddress={setNewAddress}
                      />
                    }
                  </Box>
                  <Box>
                  <Box sx={{ display: 'flex', my: 2,px:1, alignItems: 'center', justifyContent:'space-between' }}>
                     <span>
                    by {delivery}
                  </span>
                  <span>
                    {coupn ? <span className="text-success">You got {voucher?.percentage}% discount.</span> : <span>{numberFormat((coupn ? coupn : cartTotal) + shipping + tax).slice(3)}&#x9F3;</span>}
                  </span>
                  </Box>
                  <Box>
                    <Typography sx={{mb:1,px:1}}>
                      Order note
                    </Typography>
                    <TextareaAutosize
                      onChange={(e)=>setOrdrNote(e.target.value)}
                      style={{width:'100%',border:'0px',background: '#F4F8F9',padding:'12px'}}
                      aria-label="minimum height"
                      minRows={4}
                      placeholder="Place your order note"
                    />
                  </Box>
                  
                </Box> 
              </div>
            </Grid>
            <Grid sx={{ mt: 2, pb: { xs: '60px', sm: '60px' } }} item xs={12} md={5}>
              <h3 className="text-center fw-bold text-navi">Order Summary</h3>
              <TableContainer sx={{ bgcolor: '#F4F8F9', pt: 3 }}>
                <Table size="small">
                  <TableBody>
                    {addToCart?.map((item) => (
                      <TableRow
                        key={item?._id}
                        sx={{ border: 0 }}
                      >
                        <TableCell sx={{ borderBottom: '1px solid #e9edf4' }}>
                          {
                            item.os ? <Link title="See Details" to={`/mobile/${item?._id}`}>
                              <img style={{ width: "1.5rem" }} src={item?.image} alt="" />
                            </Link> :
                              <Link title="See Details" to={`/mobile2/${item._id}`}>
                                <img style={{ width: "2rem" }} src={item?.image} alt="" />
                              </Link>
                          }
                        </TableCell>
                        <TableCell align="left" sx={{ borderBottom: '1px solid #e9edf4' }}>{item?.name}<br />
                          <small className='text-secondary'>
                            &#x9F3;{numberFormat(item.price).slice(3, -3)}<AiOutlineClose />{item?.cartQuantity}
                          </small>
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e9edf4' }}>
                          &#x9F3;{numberFormat(item?.price * item?.cartQuantity).slice(3, -3)}
                        </TableCell>
                      </TableRow>
                    ))
                    }
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} colSpan={1}>Total Items</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e9edf4' }} align="left">{addToCart?.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} colSpan={1}>Items Quantity</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e9edf4' }} align="left">{cartTotalQuantity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} colSpan={1}>Subtotal</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e9edf4' }} align="left">
                        {coupn ? <span><s className="text-danger">&#x9F3;{numberFormat(cartTotal).slice(3, -3)}</s> &#x9F3;{numberFormat(coupn).slice(3, -3)}</span> : <span>&#x9F3;{numberFormat(cartTotal).slice(3, -3)}</span>}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} colSpan={1}>Tax</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #e9edf4' }} align="left">&#x9F3;{numberFormat(tax).slice(3)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} colSpan={1}>Shipping Fee</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} align="left">{shipping === 0 ? <span><s style={{ color: "red" }}>100&#x9F3;</s> FREE</span>
                        : <span> {shipping}&#x9F3; </span>}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell sx={{ borderBottom: '1px solid #e9edf4' }} colSpan={2}>
                        <Paper component="form"
                          sx={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid #e9edf4', boxShadow: 0 }}>

                          <InputBase
                            sx={{ mx: 1, flex: 1 }}
                            disabled={coupn ? true : false}
                            value={cpn}
                            type='search'
                            onKeyDown={keyPress}
                            onChange={(e) => setCpn(e.target.value)}
                            placeholder="Enter coupon code"
                          />
                          <Button disabled={cpn.length === 0 || coupn ? true : false} onClick={appliedCoupon} color={cpn ? 'secondary' : 'inherit'} variant="contained" sx={{ p: '10px', px: 2, borderRadius: 0, boxShadow: 0 }}>
                            Apply
                          </Button>
                        </Paper>
                        <FormHelperText>
                          {coupn ? <span className="text-success"> '{voucher?.code}' coupon applied</span> : `Apply "${voucher?.code}" to get ${voucher?.percentage}% discount`}
                        </FormHelperText>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 0 }} />
                      <TableCell color="secondary" sx={{ border: 0, fontWeight: 'bold', color: "red", fontSize: '1.1em' }} colSpan={1}>Total</TableCell>
                      <TableCell sx={{ border: 0, fontWeight: 'bold', color: "red" }} align="left">&#x9F3;{numberFormat((coupn ? coupn : cartTotal) + shipping + tax).slice(3)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button disabled={(newAddress?.phone || defaultAdrs?.phone) ? false : true}
                  onClick={handleSubmit(onSubmit)} fullWidth size='large' color='secondary' variant="contained" sx={{ borderRadius: 0, boxShadow: 0, bgcolor: "#183153", display: { xs: 'none', sm: 'none', md: 'block' } }}>Place Order</Button>
              </TableContainer>

            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <Footer />
        </Box>

        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(20px)", boxShadow: 0, display: { md: 'none' } }}>
          <Toolbar>
            <Typography variant='h6' className="text-navi fw-bolder">
              &#x9F3;{numberFormat(Math.ceil(coupn ? coupn : cartTotal) + shipping + tax).slice(3, -3)}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button disabled={(newAddress?.phone || defaultAdrs?.phone) ? false : true}
              onClick={handleSubmit(onSubmit)} size='large' color='secondary' variant="contained" sx={{ borderRadius: 0, boxShadow: 0, bgcolor: "#183153" }}>Place Order</Button>
          </Toolbar>
        </AppBar>
      </div>
    </>

  );
};

export default PlaceOrder;
