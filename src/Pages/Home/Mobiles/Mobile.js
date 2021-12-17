import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Mobile.css";

const Mobile = ({ mobile }) => {
    const { _id, name, star, price, specs, image } = mobile;
    return (
        <div>

            <div className="col rounded text-center">
                <div className="card card-hover border-0 h-100">
                    <div className='row p-3 g-0'>
                        <div className='col-md-8'>
                            <h5 className="text-dark pt-3">{name}</h5>
                            <Box sx={{
                                '& > legend': { mt: 2 },
                            }}>
                                <Rating name="half-rating-read" precision={0.5} size="small" value={Number(star)} readOnly />
                            </Box>
                            <div style={{ textAlign: "justify" }} className="p-2">
                                <p className="text-secondary">{specs}</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <img style={{ height: "12rem" }} src={image} className="img-fluid rounded-start" alt="" />
                            <p>Tk: <span className="text-danger fw-bold">{price}</span></p>
                        </div>
                    </div>
                    <div className="px-4 d-flex justify-content-between">
                        <Link to={`/mobile/${_id}`}><button className="btn btn-custom-2">OVERVIEW</button></Link>
                        <Link to={`/mobile/${_id}`}><button className="btn btn-custom">BUY NOW</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mobile;