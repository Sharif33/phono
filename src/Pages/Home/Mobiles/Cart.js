// import React, {useContext} from 'react';
import React, {useEffect} from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, getTotal, increment, removeFromCart } from '../../../Redux/slices/cartSlice';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import Header from '../../../Shared/Header/Header';
// import Mobile from './Mobile';
import { Link } from 'react-router-dom';
import Footer from '../../../Shared/Footer/Footer';
import emptyBag from '../../../images/emptyShoppingBag.webp';

const Cart = () => {
    // const {cart} = useContext(Favourite);
    const dispatch = useDispatch();
    const {addToCart, cartTotal, cartTotalQuantity, shipping, tax} = useSelector((state) => state.cart);
    useEffect(() => {
        if (addToCart.length >= 0) {
            dispatch(getTotal());
        }
    }, [addToCart, dispatch]);


    return (
       <div style={{backgroundColor:"#EEF2FF"}}>
           <Header/>
           {
               addToCart?.length ? <div className="container py-4">
                   <div className='text-center my-4'>
                       <h1><i style={{color:"#183153"}} className="fa-brands fa-shopify"></i> <span className='text-secondary fw-bold'> {addToCart?.length}</span> items</h1>
                       <h1> <span style={{color:"#183153"}} className="fw-bold"> &#x9F3; </span> <span className='text-secondary'> {cartTotal+shipping+tax}</span></h1>
                   </div>
                    <div className='row mx-auto'>
                        <div className='col-md-8 col-sm-12 my-3'>
  <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead sx={{bgcolor: 'secondary.main'}}>
                            <TableRow>
                                <TableCell sx={{ color: 'secondary.main'}}>Thumb</TableCell>
                                <TableCell sx={{ color: 'secondary.main'}}>Name</TableCell>
                                <TableCell sx={{ color: 'secondary.main'}} align="center">Brand</TableCell>
                                <TableCell sx={{ color: 'secondary.main'}} align="center">Qty.</TableCell>
                                <TableCell sx={{ color: 'secondary.main'}} align="center">Price</TableCell>
                                <TableCell sx={{ color: 'secondary.main'}} align="center">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            addToCart.map((mobile) => (
                                <TableRow hover
                                    key={mobile?._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {
                                            mobile?.os ? <Link title='See Details' to={`/mobile/${mobile?._id}`}> <img style={{width:"3rem"}} className='img-fluid' src={mobile?.image} alt="" />
                                            </Link>
                                            :
                                            <Link title='See Details' to={`/mobile2/${mobile?._id}`}> <img style={{width:"3rem"}} className='img-fluid' src={mobile?.image} alt="" />
                                            </Link>
                                        }
                                    
                                    </TableCell>

                                    <TableCell align="left">{mobile?.name}
                                    <div>
                                        <button className='border-0 bg-transparent text-secondary' onClick={()=>dispatch((removeFromCart(mobile)))}>(Remove)</button>
                                    </div>
                                    </TableCell>

                                    <TableCell align="center">{mobile?.brand}</TableCell>

                                    <TableCell align="center">
                                    <div className="mx-auto">
                                                        <div style={{width:"10vw"}} className="d-flex justify-content-center border mx-auto">
                                                            <button className='btn w-100 btn-light shadow' onClick={() => dispatch(decrement(mobile))}> - </button>
                                                            <input style={{width:"5vw"}} type="text" readOnly value={(Number(mobile?.cartQuantity) || 1)}
                                                                className="fw-bolder border-0 text-center text-secondary" />
                                                            <button className='btn w-100 btn-light shadow' onClick={() => dispatch(increment(mobile))}> + </button>
                                                        </div>
                                                    </div>
                                    </TableCell>
                                    <TableCell align="center">{mobile?.price}</TableCell>
                                    <TableCell align="center">{(Number(mobile?.price)) * (Number(mobile?.cartQuantity))}</TableCell>
                                    
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
                <span className="text-secondary fs-5">{cartTotal} &#x9F3;</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Shipping
                <span className="text-secondary fs-5">{shipping} &#x9F3;</span>
            </li>
            
            <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                Tax
                <span className="text-secondary fs-5">{tax} &#x9F3;</span>
            </li>
            
            <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                Total
                <span className="text-danger fw-bold fs-5">{cartTotal + shipping + tax} &#x9F3;</span>
            </li>
            <br />
                        <div className="input-group input-group-lg">
                            <input type="text" placeholder="Apply Coupn" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                            <span className="input-group-text btn-primary btn" id="inputGroup-sizing-lg">Apply</span>
                        </div>
                        <br />
                <div>
                    <Link to={`/placeOrder`}>
                        <button className='btn btn-lg btn-custom-2 w-100 rounded-0'>Place Order</button>
                    </Link>
                </div>
            </ul>
            </div>
        </div>
              
        </div>
        : 
        <div className='text-center my-5 pt-5'>
            <img src={emptyBag} alt="" className="img-fluid p-3" /> <br /> <br />
            <h3>Your shopping cart is empty, Please add some products before you checkout.</h3> 
            <Link to={`/`}><button className="btn btn-lg btn-custom">Start shopping now</button></Link>
            
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
         
    );
};

export default Cart;