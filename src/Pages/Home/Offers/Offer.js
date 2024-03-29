import React,{useState} from 'react';
import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { addToCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import { MdAddShoppingCart, MdOutlineFavoriteBorder,MdOutlineCompareArrows,MdOutlineFavorite } from "react-icons/md";
import CountdownTimer from '../../Countdown/CountdownTimer';
import { numberFormat } from '../../../Shared/numberFormat';
import { addToCompare } from '../../../Redux/slices/compareSlice';
import { NavHashLink } from 'react-router-hash-link';

const Offer = ({offer}) => {
    const [toggleBtn, setToggleBtn] = useState(false);

    const showToggle = () => {
        setToggleBtn(true);
    }
    const hideToggle = () => {
        setToggleBtn(false);
    }
    const { _id, star, name,price, image, offerTill } = offer;
    const dispatch = useDispatch();
    return (
        <div>
        <div className="col rounded text-center">
            <div className="card-hover card border-0 h-100">
               
                <div className='rounded py-3'>
                  
                       <div> 
                        <div className="offer-badge">
                            <p className='bg-primary p-1 text-light badge'>10% OFF</p>
                        </div> 
                        <div className="card-btns">
                       <button onClick={() => dispatch(addToCart(offer))} className='btn btn-cart border-0 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button> <br />

                       {
                                toggleBtn ? <button onClick={() => dispatch(removeFromFvrt(offer))} className='btn btn-cart border-0 my-2 rounded'> <span onClick={hideToggle}><MdOutlineFavorite title='Remove from Favourite' className="fs-3 p-1"/></span>  </button> :  <button onClick={() => dispatch(addToFvrt(offer))} className='btn btn-cart border-0 my-2 rounded'> <span onClick={showToggle}><MdOutlineFavoriteBorder title='Add to Favourite' className="fs-3 p-1"/></span> </button>

                        } <br />

                        <button onClick={() => dispatch(addToCompare(offer))} className='btn btn-cart border-0 rounded'><MdOutlineCompareArrows className='fs-3 p-1'/></button>

                       </div>
                       <img style={{ height: "10rem" }} src={image} className="img-fluid rounded-start" alt="" />
                        {/* <p>Tk: <span className="text-danger fw-bold">{price}</span></p> */}
                       </div>
                       
                    </div>
                    <div className=''>
                        
                    <NavHashLink style={{textDecoration:"none"}} to={`/mobile2/${_id}#detailsOffer`}> <h5 className="text-dark">{name}</h5>
                        <Box sx={{'& > legend': { mt: 2 },}}>
                            <Rating name="half-rating-read" precision={0.5} size="small" value={Number(star)} readOnly />
                        </Box>
                        <div style={{ textAlign: "center" }}>
                            <p><span className='text-navi fw-bold' > <span style={{fontFamily: 'Noto Sans Bengali'}}>&#x9F3;</span>{numberFormat(Number(price)).slice(3,-3)}</span> <s style={{color:"#eb5525"}}>&#x9F3;{numberFormat(Math.round(Number(price*.10) + Number(price))).slice(3,-3)}</s> </p>
                        </div>
                    </NavHashLink>
                    {/* <button onClick={() => dispatch(addToCompare(offer))} className='btn btn-indigo border-0 rounded-0'>Compare</button> */}
                    </div>
                
                <div>
                    <CountdownTimer offerTill={offerTill} />
                    </div>
            </div>
        </div>
    </div>
    );
};

export default Offer;