import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth/useAuth';

const BuyMobile = () => {
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
            <div className='col-md-6 mx-auto'>
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
                                        <Button className='w-100 btn-custom' type="submit" variant="contained">ORDER</Button>

                                    </form>
                                }
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default BuyMobile;