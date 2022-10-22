// import React, {useContext} from 'react';
import React, {useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, getTotal, increment, removeFromCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt, removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import Header from '../../../Shared/Header/Header';
// import Mobile from './Mobile';
import { Link } from 'react-router-dom';
import Footer from '../../../Shared/Footer/Footer';
import { numberFormat } from '../../../Shared/numberFormat';
import {Helmet} from "react-helmet";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { RiDeleteBin5Fill,RiShoppingBag3Fill } from "react-icons/ri";

const Cart = () => {  
    // const {cart} = useContext(Favourite);
    const dispatch = useDispatch();
    const {addToCart, cartTotal, cartTotalQuantity, shipping, tax, delivery} = useSelector((state) => state.cart);

    // console.log(addToCart);
    
    useEffect(() => {
        dispatch(getTotal());
      }, [addToCart, dispatch]);

      const toFvrt = useSelector((state) => state.fvrt);

    return (
        <>
        <div style={{backgroundColor:"#EEF2FF"}}>
           <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Cart</title>
                <link rel="canonical" href="/cart" />
            </Helmet>
           <Header/>
           {
               addToCart.length ? <div className="container-lg py-4">
                   <div className='text-center my-4'>
                       <h1> <RiShoppingBag3Fill style={{color:"#183153"}}/> <span className='text-secondary fw-bold'> {addToCart?.length}</span> item(s)</h1>
                       <h1> <span style={{color:"#183153"}} className="fw-bold">Tk</span> <span className='text-secondary'> {numberFormat(cartTotal+shipping+tax).slice(3)}</span></h1>
                   </div>
                    <div className='row mx-auto'>
                        <div className='col-md-8 col-sm-12 my-3'>
                        <p>Estimated Delivery: <span className="text-navi fw-bold">{delivery}</span></p>
                <TableContainer>
                    
                    <Table >
                        {/* <TableHead sx={{bgcolor: 'secondary.main'}}>
                            <TableRow>
                                <TableCell sx={{ color: 'secondary.main', border: '0px'}}>
                                    <button onClick={()=> dispatch(clearCart(addToCart))} className="btn btn-sm btn-outline-danger">Delete All</button>
                                </TableCell>
                                <TableCell sx={{ color: 'secondary.main', border: '0px'}}>Name</TableCell>
                                <TableCell sx={{ color: 'secondary.main', border: '0px'}} align="center">Brand</TableCell>
                                <TableCell sx={{ color: 'secondary.main', border: '0px'}} align="center">Qty.</TableCell>
                                <TableCell sx={{ color: 'secondary.main', border: '0px'}} align="center">Price</TableCell>
                                <TableCell sx={{ color: 'secondary.main', border: '0px'}} align="center">Total</TableCell>
                            </TableRow>
                        </TableHead> */}
                        <TableBody>
                            {
                            addToCart.map((mobile) => (
                                <TableRow hover
                                    key={mobile?._id}
                                    sx={{ border: 0 } }
                                >
                                    <TableCell sx={{border: '0px', textAlign:'center'}} >
                                        {
                                            mobile?.os ? <Link title='See Details' to={`/mobile/${mobile?._id}`}> <img style={{width:"3rem"}} className='img-fluid' src={mobile?.image} alt="" />
                                            {/* <span className="m-1 text-navi">
                                                &#x9F3;{numberFormat(mobile.price).slice(3,-3)}
                                                <small className='text-secondary'>/1</small>	
                                            </span> */}
                                            </Link>
                                            :
                                            <Link title='See Details' to={`/mobile2/${mobile?._id}`}> <img style={{width:"3rem"}} className='img-fluid' src={mobile?.image} alt="" />
                                           {/*  <span className="m-1 text-navi">
                                               &#x9F3;{numberFormat(mobile.price).slice(3,-3)}
                                               <small className='text-secondary'>/1</small>	
                                            </span> */}
                                            </Link>
                                        }
                                    
                                    </TableCell>

                                    <TableCell sx={{border: '0px'}} align="left">
                                        {mobile?.name}
                                    <div>
                                        <small className='text-secondary'>
                                         {mobile?.brand} 
                                        </small>
                                       {/*  <button className='border-0 bg-transparent text-secondary' onClick={()=>dispatch((removeFromCart(mobile)))}>(Remove)</button> */}
                                    </div>
                                    </TableCell>
                                    <TableCell sx={{border: '0px'}} align="center">
                                    <div className="m-auto">
                                                <div className="d-flex justify-content-between align-items-center border">
                                                        <button className='btn btn-cart rounded-0' onClick={() => dispatch(decrement(mobile))}> - </button>
                                                        <span className='mw-qty'>{mobile?.cartQuantity}</span>
                                                        <button className='btn btn-cart rounded-0' onClick={() => dispatch(increment(mobile))}> + </button>
                                                </div>
                                        </div>
                                        <div className='mt-1'>
                                            <span className='text-navi fw-bold'>
                                               &#x9F3; {numberFormat(mobile.price * mobile.cartQuantity).slice(3,-3)}
                                            </span>
                                            <span><small className='text-secondary'>/{mobile?.cartQuantity}</small></span> 
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{border: '0px'}} align="center">
                                    <div className='d-flex justify-content-evenly'>
                                        {
                                            toFvrt?.addToFvrt.find((ft)=> ft?._id === mobile._id ) ? <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn border-0 rounded'><MdOutlineFavorite title='Remove from Favourite' className="fs-3 p-1"/> </button> : <button onClick={() => dispatch(addToFvrt(mobile))} className='btn border-0 rounded'><MdFavoriteBorder title='Add To Favourite' className="fs-3 p-1 text-navi"/></button>
                                        }

                            <button onClick={() => dispatch(removeFromCart(mobile))} className='btn border-0 rounded'><RiDeleteBin5Fill title='Remove From Cart' className='fs-3 p-1 text-pink'/></button>
                </div>
                                    </TableCell>
                                   {/*  <TableCell sx={{border: '0px'}} align="center">{numberFormat(mobile.price).slice(3,-3)}	&#x9F3;</TableCell>
                                    <TableCell sx={{border: '0px'}} align="center">{numberFormat(mobile.price * mobile.cartQuantity).slice(3,-3)}	&#x9F3;</TableCell> */}
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                        </div>
        <div className='col-md-4 col-sm-12 bg-light py-2 rounded'>
            <h3 className='text-center fw-bold'>Cart summary</h3>
            <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Total Items
                <span className="text-secondary fs-5">{addToCart?.length}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Items Quantity
                <span className="text-secondary fs-5">{cartTotalQuantity}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Subtotal
                <span className="text-secondary fs-5">{numberFormat(cartTotal).slice(3,-3)} Tk</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Tax
                <span className="text-secondary fs-5">{numberFormat(tax).slice(3)} Tk</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Shipping
                <span className="text-secondary fs-5">{shipping} Tk</span>
            </li>
            
            <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                Total
                <span className="text-danger fw-bold fs-5">{numberFormat(cartTotal + shipping + tax).slice(3)} Tk</span>
            </li>
                        <div >
                            <small>*Billing info & voucher in nex page.</small>
                        </div>
                <div>
                    <Link to={`/placeOrder`}>
                        <button className='btn btn-lg btn-pink w-100 rounded-0'>PROCEED TO CHECKOUT</button>
                    </Link>
                </div>
            </ul>
            </div>
        </div>
              
        </div>
        : 
        <div style={{height:"100vh"}} className='text-center pt-5'>
            {/* <img src={emptyBag} alt="" className="img-fluid p-3" /> <br /> <br /> */}
            <div className="d-flex justify-content-center p-3">
             <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_3VDN1k.json"  background="transparent"  speed="4"  style={{width:"20rem"}}  loop  autoplay></lottie-player>   
            </div>
            
            <h4>Your shopping bag is empty, Please add some products before you checkout.</h4> <br />
            <Link to={`/mobiles`}><button className="btn btn-lg btn-pink">Start shopping now</button></Link>
            
        </div>
           }
                
               
           {/* <div className="row row-cols-1 row-cols-md-2 m-2 g-4">
           {
               addToCart?.map((mobile)=>(
                  <Mobile
                  mobile={mobile}
                  key={mobile.id}
                  /> 
               ))
           }
           </div> */}
           {/* <div style={{paddingTop:"70px"}}>
               <h1>{cart.length}</h1>
           </div>
           {
               cart.map((mobile)=>(
                  <Mobile
                  mobile={mobile}
                  key={mobile.id}
                  /> 
               ))
           } */}
           <Footer/>
       </div>
        </>
       
         
    );
};

export default Cart;