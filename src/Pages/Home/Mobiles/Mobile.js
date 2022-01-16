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
                            <div className="d-flex">
                        <Link to={`/mobile/${_id}`}><i title='Details' className="fas mx-2 text-info fs-4 fa-info-circle"></i></Link>
                        <i onClick={handleOpen} title='Order Now' className="fas mx-2 fs-4 text-danger fa-cart-plus"></i>
                        <i onClick={handleOpen} title='Add to Favourite' className="far mx-2 fs-4 text-warning fa-heart"></i>
                        
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