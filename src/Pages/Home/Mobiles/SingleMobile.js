import { Box, Button, Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth/useAuth';

const SingleMobile = () => {
    const { user, admin } = useAuth();

    const { id } = useParams();

    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/phones/${id}`)
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [id])


    // post bike

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data);

        axios.post(`http://localhost:5000/orders`, data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Purchase successfully.Please Check My Order');
                    reset();
                }
            })
    }

    return (
        <div>
            <div style={{ paddingTop: "65px" }} className='bg-light'>

            </div>
            <img style={{ height: "30rem" }} className='w-100 img-fluid' src={bikes?.image} alt="" />
            <div className='container py-5'>
                <div className="row">
                    <div className="col-md-9">
                        <h3 style={{ color: "#62599F" }}>{bikes?.name}</h3>
                        <h5 className="text-decoration-underline" style={{ color: "#005562" }}>{bikes?.keySpecs}</h5>
                        <Box sx={{
                            '& > legend': { mt: 2 },
                        }}>
                            <Rating name="half-rating-read" precision={0.5} size="small" value={Number(bikes?.rating)} readOnly /><span className="text-secondary">({bikes?.reviews}) bikers review this Bike</span>
                        </Box>
                        <div className=" d-flex justify-contenet-between align-items-center">
                            <h4 className="w-100 py-3">Price: <span className="text-danger fw-bold">{bikes?.price} BDT</span> <span className="fs-6 ">(taxe included)</span></h4>
                            <h5 className="w-100 text-end">Phone: {bikes?.contact}</h5>

                        </div>
                        <p>{bikes?.description}</p>
                    </div>

                    <div className="col-md-3 ">
                        <div className="add-bikes">
                            <div className="shadow p-4 bg-custom rounded">
                                <h3 className="text-custom">BUY this bike</h3>
                                <div>
                                    {
                                        bikes?.name && <form onSubmit={handleSubmit(onSubmit)}>
                                            <input defaultValue={bikes?.name} readOnly {...register("bike", { required: true })} />
                                            {errors.resort && <span className="text-warning">This field is required. </span>}
                                            <input defaultValue={bikes?.price} readOnly {...register("price")} />
                                            <input defaultValue="Pending..." readOnly hidden {...register("status")} />
                                            <input defaultValue={user?.displayName} readOnly {...register("name")} />
                                            <input defaultValue={user?.email} readOnly {...register("email", { required: true })} />
                                            {errors.email && <span className="text-warning">This field is required.</span>}
                                            <input placeholder="Present Address"  {...register("address")} />
                                            <input placeholder="City and Country"  {...register("city")} />
                                            <input placeholder="Phone number"  {...register("phone", { required: true })} />
                                            {errors.phone && <span className="text-warning">This field is required.</span>}
                                            <input defaultValue={new Date()} type="date"  {...register("date", { required: true })} />
                                            {errors.date && <span className="text-warning">This field is required.</span>}
                                            <input defaultValue={bikes?.image} hidden readOnly {...register("image", { required: true })} />
                                            {errors.image && <span className="text-warning">This field is required.</span>}
                                            {!admin && <Button type="submit" variant="contained">buy</Button>}

                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMobile;