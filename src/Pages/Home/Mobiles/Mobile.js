import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import { addToCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import { addToCompare } from '../../../Redux/slices/compareSlice';
// import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import BuyMobile from './BuyMobile';
import "./Mobile.css";

const Mobile = ({ mobile}) => {
    // const {cart,setCart} = useContext(Favourite);
    const { _id, name, star, price, specs, image } = mobile;
    const [openBuyNow, setOpenBuyNow] = React.useState(false);
    const handleOpen = () => setOpenBuyNow(true);
    const handleClose = () => setOpenBuyNow(false);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="col rounded text-center">
                <div className="card shadow h-100">
                    <div className='row flex-row-reverse px-3 py-2 g-0'>
                    <div className='col-md-4 card-hover '>
                      
                           <div>  
                            <div className="card-btns">
                           <button onClick={() => dispatch(addToCart(mobile))} className='btn btn-custom border-0 my-2 rounded-circle'> <i title='Add to Cart' className="fas fa-cart-plus fs-4 py-1"></i> </button> <br />

                            <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-custom-2 border-0 my-2 rounded-circle'> <i title='Add to Favourite' className="far fa-heart fs-4 py-1"></i> </button>
  
                           </div>
                           <img style={{ height: "12rem" }} src={image} className="img-fluid rounded-start" alt="" />
                            <p>Tk: <span className="text-danger fw-bold">{price}</span></p>
                           </div>
                           
                        </div>
                        <div className='col-md-8'>
                            <h5 className="text-dark pt-1">{name}</h5>
                            <Box sx={{
                                '& > legend': { mt: 2 },
                            }}>
                                <Rating name="half-rating-read" precision={0.5} size="small" value={Number(star)} readOnly />
                            </Box>
                            <div style={{ textAlign: "justify" }} className="p-2">
                                <p className="text-secondary">{specs}</p>
                            </div>
                            <div className="text-center d-flex justify-content-center alighn-items-center">

                        <Link to={`/mobile/${_id}`}> <button className='btn btn-custom-2 rounded-0 border-0'>Details</button> </Link>
                        <button onClick={handleOpen} className='btn btn-custom rounded-0 border-0'>Quick View</button>
                        <button onClick={() => dispatch(addToCompare(mobile))} className='btn btn-custom-3 border-0 rounded-0'>Compare</button>

                        {/* <button onClick={handleOpen} className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Order Now' className="fas fa-cart-plus fs-4 py-1"></i> </button> */}
                       
        
                  {/*       <div>
                           {
                            cart.includes(mobile) ? (
                              <button onClick={()=>{setCart(cart.filter((c)=>c.id !== mobile?.id))}} className='btn btn-outline-warning mx-2'> <i title='Remove from Favourite' className="fas fa-heart"></i> </button>  
                            )
                            :
                            (
                            <button onClick={()=>{setCart([...cart,mobile])}} className='btn btn-outline-warning mx-2'> <i title='Add to Favourite' className="far fa-heart"></i> </button>
                            )
                        }   
                        </div> */}
                    {/*     <div>
                            <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-outline-warning mx-2'> <i title='Add to Favourite' className="far fa-heart"></i> </button>
                           <button onClick={() => dispatch(addToCart(mobile))} className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Add to Cart' className="fas fa-cart-plus fs-4 py-1"></i> </button>

                            <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Add to Favourite' className="far fa-heart fs-4 py-1"></i> </button>                            
                        </div>
                     */}
                    </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <BuyMobile
            handleClose={handleClose}
            mobile={mobile}
            openBuyNow={openBuyNow}
            ></BuyMobile>
        </div>
    );
};

export default Mobile;