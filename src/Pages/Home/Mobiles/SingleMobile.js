import { Box, Button, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth/useAuth';
import Footer from '../../../Shared/Footer/Footer';
import Header from '../../../Shared/Header/Header';
import Banner3 from '../../Banner/Banner3';

const SingleMobile = () => {
    const { user, admin } = useAuth();

    const { id } = useParams();

    const [phones, setPhones] = useState([]);

    const date = new Date().toLocaleDateString();


    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones/${id}`)
            .then(res => res.json())
            .then(data => setPhones(data))
    }, [id])


    // post bike

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data);

        axios.post(`https://peaceful-shore-84874.herokuapp.com/orders`, data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Purchase successfully.Please Check My Order');
                    reset();
                }
            })
    }

    return (
        <div>
             <Header />
            <div style={{ paddingTop: "65px" }} className='bg-light'>

            </div>

            <div className='container py-5'>
                <div className="row">
                    <div className='col-md-4'>
                        <div className='text-center'>
                            <h3 style={{ color: "#62599F" }}>{phones?.name}</h3>
                            <img className='w-100 img-fluid' src={phones?.image} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.processor}</li>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.memory}</li>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.display}</li>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.battery}</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.camera}</li>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.selfie}</li>
                            <li className="mb-5 fs-5"><i className="fas fa-chevron-right"> </i> {phones?.network}</li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className='text-center py-3 custom-margin'>
                    <button className='btn p-4 fs-1 rounded-circle btn-custom'><i className="fas fa-cart-arrow-down"></i></button>
                </div>
                <div className="row p-5 custom-border">
                    <div className='col-md-6'>
                        <div className='py-1'>
                            <h4 className='text-center fw-bold'>OVERVIEW</h4>
                            <hr />
                            <h5 className="w-100 text-secondary text-center my-2"><i className="fas p-3 text-info rounded-pill custom-border bg-light fa-phone-volume"> {phones?.contact}</i> </h5>
                            <div className='py-3'>
                            <h5 className='fs-6'>Brand Name: <span className='fs-5 text-dark fw-bold'> {phones?.name}</span></h5>
                            <Box sx={{
                                '& > legend': { mt: 2 },
                            }}>
                                <Typography><Rating name="half-rating-read" precision={0.5} size="small" value={Number(phones?.star)} readOnly />( {phones?.rating} user review this ) </Typography>

                            </Box>

                            <h5 className="w-100 py-3"><span className="text-danger fw-bold">{phones?.price} BDT</span> <span className="fs-6 ">(tax included)</span></h5>
                            
                            <h5 style={{ textAlign: "justify" }} className='text-secondary' >{phones?.specs}</h5>
                            </div>
                            <div className='text-center p-4'>
                                <small className='text-secondary'>*To order this {phones?.name} mobile on online or buy, please call us or fill up the form</small>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="py-1 rounded">
                            <div>
                                {
                                    phones?.name && <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
                                        <input defaultValue={phones?.name} readOnly {...register("mobile", { required: true })} />
                                        {errors.resort && <span className="text-warning">This field is required. </span>}
                                        <input defaultValue={phones?.price} readOnly {...register("price")} />
                                        <input defaultValue="Pending..." readOnly hidden {...register("status")} />
                                        <input defaultValue={user?.displayName} readOnly {...register("name")} />
                                        <input defaultValue={user?.email} readOnly {...register("email", { required: true })} />
                                        {errors.email && <span className="text-warning">This field is required.</span>}
                                        <input placeholder="Present Address"  {...register("address")} />
                                        <input placeholder="City and Country"  {...register("city")} />
                                        <input placeholder="Phone number"  {...register("phone", { required: true })} />
                                        {errors.phone && <span className="text-warning">This field is required.</span>}
                                        <input defaultValue={date} type="date"  {...register("date", { required: true })} />
                                        <input defaultValue={new Date().getTime()} type="time"  {...register("time", { required: true })} />
                                        {errors.date && <span className="text-warning">This field is required.</span>}
                                        <input defaultValue={phones?.image} hidden readOnly {...register("image", { required: true })} />
                                        {errors.image && <span className="text-warning">This field is required.</span>} <br />
                                        {!admin && <Button className='w-100 btn-custom' type="submit" variant="contained">ORDER</Button>}

                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Banner3/>
            <Footer/>
        </div>
    );
};

export default SingleMobile;