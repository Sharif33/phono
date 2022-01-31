import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import BuyMobile from './BuyMobile';
import "./Mobile.css";

const Mobile = ({ mobile }) => {
    const { _id, name, star, price, specs, image } = mobile;
    const [openBuyNow, setOpenBuyNow] = React.useState(false);
    const handleOpen = () => setOpenBuyNow(true);
    const handleClose = () => setOpenBuyNow(false);
    return (
        <div>

            <div className="col rounded text-center">
                <div className="card card-hover shadow h-100">
                    <div className='row flex-row-reverse px-3 py-2 g-0'>
                    <div className='col-md-4'>
                            <img style={{ height: "12rem" }} src={image} className="img-fluid rounded-start" alt="" />
                            <p>Tk: <span className="text-danger fw-bold">{price}</span></p>
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
                        <Link to={`/mobile/${_id}`}> <button className='btn btn-outline-info mx-2'> <i title='Details' className="fas fa-info-circle"></i> </button> </Link>
                        <button onClick={handleOpen} className='btn btn-outline-danger mx-2'> <i title='Order Now' className="fas fa-cart-plus"></i> </button>
                        
                        <button onClick={handleOpen} className='btn btn-outline-warning mx-2'> <i title='Add to Favourite' className="far fa-heart"></i> </button>
                        
                        
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