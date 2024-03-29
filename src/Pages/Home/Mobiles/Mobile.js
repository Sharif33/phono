// import { Rating } from '@mui/material';
// import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import { addToCart,increment,decrement } from '../../../Redux/slices/cartSlice';
import { addToFvrt,removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import { addToCompare, removeFromCompare } from '../../../Redux/slices/compareSlice';
import BuyMobile from './BuyMobile';
import "./Mobile.css";
import { numberFormat } from '../../../Shared/numberFormat';
import { MdInfo, MdVisibility, MdAddShoppingCart, MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { TbScaleOff,TbScale } from "react-icons/tb";
import { NavHashLink } from 'react-router-hash-link';
import { Box, Button, ButtonGroup } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Mobile = ({ mobile}) => {
    const { _id, name, price, ram, storage, image, chipset } = mobile;

    const toCart = useSelector((state) => state.cart);
    const toFvrt = useSelector((state) => state.fvrt);
    const toCompare = useSelector((state) => state.compare);

    const toggleCart = toCart.addToCart.find((ct)=> ct?._id === _id );
    // console.log(toggleCart?.cartQuantity);

    const toggleFvrt = toFvrt?.addToFvrt.find((ft)=> ft?._id === _id );
    // console.log(toggleFvrt);

    const toggleCompare = toCompare?.addToCompare.find((ct)=> ct?._id === _id );
    // console.log(toggleCompare);

    /* const [toggleBtn, setToggleBtn] = useState(false);
    const showToggle = () => {
        setToggleBtn(true);
    }
    const hideToggle = () => {
        setToggleBtn(false);
    } */

    // const {cart,setCart} = useContext(Favourite);
  
    const [openBuyNow, setOpenBuyNow] = React.useState(false);
    const handleOpen = () => setOpenBuyNow(true);
    const handleClose = () => setOpenBuyNow(false);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="col rounded text-center">
                <div className="card border-0 custom-shadow h-100 card-hover ">
                   
                    <div className='rounded py-2'>
                      
                           <div>  
                            <div className="card-btns">

                            <NavHashLink to={`/mobile/${_id}#details`}> <button className='btn btn-cart border-0 my-2 rounded'><MdInfo className='fs-3 p-1'/></button> </NavHashLink>
                            <br />
                            <button onClick={handleOpen} className='btn btn-cart border-0 my-2 rounded'><MdVisibility className='fs-3 p-1'/></button>
                           
                           </div>

                           <img style={{ height: "10rem" }} src={image} className="img-fluid rounded-start" alt="" />
                           </div>
                           
                        </div>
                        <div className='text-start px-3'>
                            <div>
                            <Link to={`/mobile/${_id}`}> 
                            <h6 className="text-navi fw-bold  pt-1">{name}</h6>
                            {/* <Box sx={{
                                '& > legend': { mt: 2 },
                            }}>
                                <Rating name="half-rating-read" precision={0.5} size="small" value={Number(star)} readOnly />
                            </Box> */}
                            <div style={{ textAlign: "justify" }} >
                               <small className="text-secondary">{ram} {storage} | {chipset}</small>
                               <br />
                                <strong className='text-pink' > <span style={{fontFamily: 'Noto Sans Bengali'}}>&#x9F3;</span>{numberFormat(price).slice(3,-3) }<small className='fs-xs' > + VAT</small></strong>
                            </div>
                            </Link>
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center">
                            {
                                toggleCart ? 
                                <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center', }}>
                                <ButtonGroup className='bg-cart' color='secondary' variant="text" aria-label="outlined button group">
                                    <Button onClick={() => dispatch(decrement(mobile))}><RemoveOutlinedIcon style={{fontSize:'1.2em',color:"#183153"}}/></Button>
                                    <Button className='bg-light'>{toggleCart?.cartQuantity}</Button>
                                    <Button onClick={() => dispatch(increment(mobile))}><AddOutlinedIcon style={{fontSize:'1.25em',color:'#183153'}}/></Button>
                                </ButtonGroup>
                            </Box>
                                :
                             <button onClick={() => dispatch(addToCart(mobile))} className='btn btn-cart border-0 my-2 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> Add to cart </button> 
                                }
                            
                            <div>
                        {/*     {
                                toggleBtn ? <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn btn-cart border-0 my-2 rounded'> <span onClick={hideToggle}><MdOutlineFavorite title='Remove from Favourite' className="fs-3 p-1"/></span>  </button> :  <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-cart border-0 my-2 rounded'> <span onClick={showToggle}><MdOutlineFavoriteBorder title='Add to Favourite' className="fs-3 p-1"/></span> </button>
                            } */}
                             {
                                toggleFvrt ? <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn bg-btn text-pink border-0 my-2 rounded'> <span><MdOutlineFavorite title='Remove from Favourite' className="fs-3 p-1"/></span> </button> :  <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-cart border-0 my-2 rounded'> <span><MdOutlineFavoriteBorder title='Add to Favourite' className="fs-3 p-1"/></span> </button>
                            }
                            </div>

                           <div>
                            {
                                toggleCompare ? <button onClick={() => dispatch(removeFromCompare(mobile))} className='btn bg-btn text-pink border-0 my-2 rounded'><TbScaleOff className='fs-3 p-1'/></button> : <button onClick={() => dispatch(addToCompare(mobile))} className='btn btn-cart border-0 my-2 rounded'><TbScale className='fs-3 p-1'/></button>
                            }
                           
                           </div>
                            </div>
                       
        
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