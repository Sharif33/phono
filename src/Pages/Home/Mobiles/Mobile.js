// import { Rating } from '@mui/material';
// import { Box } from '@mui/system';
import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import { addToCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import { addToCompare } from '../../../Redux/slices/compareSlice';
import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
// import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import BuyMobile from './BuyMobile';
import "./Mobile.css";
// import CountdownTimer from '../../Countdown/CountdownTimer';
import { numberFormat } from '../../../Shared/numberFormat';
import { MdInfo, MdVisibility, MdOutlineCompareArrows, MdAddShoppingCart, MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

const Mobile = ({ mobile}) => {
    const [toggleBtn, setToggleBtn] = useState(false);

    const showToggle = () => {
        setToggleBtn(true);
    }
    const hideToggle = () => {
        setToggleBtn(false);
    }
    // const {cart,setCart} = useContext(Favourite);
    // const offerTill = new Date().toDateString();
    const { _id, name, price, ram, storage, image, chipset } = mobile;
    const [openBuyNow, setOpenBuyNow] = React.useState(false);
    const handleOpen = () => setOpenBuyNow(true);
    const handleClose = () => setOpenBuyNow(false);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="col rounded text-center">
                <div className="card pb-3 border-0 custom-shadow h-100">
                   
                    <div className='card-hover rounded py-3'>
                      
                           <div>  
                            <div className="card-btns">
                           <button onClick={() => dispatch(addToCart(mobile))} className='btn btn-cart border-0 my-2 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button> <br />
                            {
                                toggleBtn ? <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn btn-cart border-0 my-2 rounded'> <span onClick={hideToggle}><MdOutlineFavorite title='Remove from Favourite' className="fs-3 p-1"/></span>  </button> :  <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-cart border-0 my-2 rounded'> <span onClick={showToggle}><MdOutlineFavoriteBorder title='Add to Favourite' className="fs-3 p-1"/></span> </button>

                            }
                           
  
                           </div>
                           <img style={{ height: "10rem" }} src={image} className="img-fluid rounded-start" alt="" />
                            {/* <p>Tk: <span className="text-danger fw-bold">{price}</span></p> */}
                           </div>
                           
                        </div>
                        <div className=''>
                            <h6 className="text-dark pt-1">{name}</h6>
                            {/* <Box sx={{
                                '& > legend': { mt: 2 },
                            }}>
                                <Rating name="half-rating-read" precision={0.5} size="small" value={Number(star)} readOnly />
                            </Box> */}
                            <div style={{ textAlign: "center" }} className="p-2">
                                <p className="text-secondary">{ram} {storage} | {chipset}</p>
                                <p style={{color:"#eb5525",fontWeight:"bolder"}}>{numberFormat(price).slice(3,-3) }Tk</p>
                            </div>
                            <div className="d-flex justify-content-evenly">

                        <Link to={`/mobile/${_id}`}> <button className='btn btn-cart border-0 my-2 rounded'><MdInfo className='fs-3 p-1'/></button> </Link>

                        <button onClick={handleOpen} className='btn btn-cart border-0 my-2 rounded'><MdVisibility className='fs-3 p-1'/></button>

                        <button onClick={() => dispatch(addToCompare(mobile))} className='btn btn-cart border-0 my-2 rounded'><MdOutlineCompareArrows className='fs-3 p-1'/></button>
                       

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
                    
                    {/* <div>
                        <CountdownTimer offerTill={offerTill} />
                        </div> */}
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