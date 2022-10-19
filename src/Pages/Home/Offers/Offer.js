import React,{useState} from 'react';
import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import { MdAddShoppingCart, MdOutlineFavoriteBorder,MdOutlineCompareArrows,MdOutlineFavorite } from "react-icons/md";
import CountdownTimer from '../../Countdown/CountdownTimer';
import { numberFormat } from '../../../Shared/numberFormat';
import { addToCompare } from '../../../Redux/slices/compareSlice';

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
            <div className="card pb-3 border-0 h-100">
               
                <div className='card-hover rounded py-3'>
                  
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
                        
                    <Link style={{textDecoration:"none"}} to={`/mobile2/${_id}`}> <h5 className="text-dark">{name}</h5>
                        <Box sx={{'& > legend': { mt: 2 },}}>
                            <Rating name="half-rating-read" precision={0.5} size="small" value={Number(star)} readOnly />
                        </Box>
                        <div style={{ textAlign: "center" }}>
                            <p><span className='text-primary fw-bold' > {numberFormat(Number(price)).slice(3,-3)}Tk</span> <s style={{color:"#eb5525"}}>{numberFormat(Math.round(Number(price*.10) + Number(price))).slice(3,-3)}Tk</s> </p>
                        </div></Link>
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