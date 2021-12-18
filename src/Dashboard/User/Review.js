import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth/useAuth';

const Review = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    const onSubmit = data => {
        // console.log(data);

        axios.post(`http://localhost:5000/reviews`, data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('added successfully');
                    reset();
                    window.location.reload();
                }
            })
    }
    return (
        <div>
             <div className="add-bikes p-4 col-md-6 mx-auto">
                <div className="shadow p-4 bg-custom rounded">
                    <h3 className="text-custom">Please Add a Review</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className=" rounded" readOnly defaultValue={user?.displayName} {...register("name")} />
                        <input className=" rounded" readOnly defaultValue={user?.email} {...register("email")} />
                        <input className=" rounded" hidden defaultValue={user?.photoURL} {...register("image")} />
                        <input className=" rounded" type="number" step="0.1" min='1' max='5' {...register("rating")} placeholder="Rating" />
                        <input className=" rounded" {...register("bike")} placeholder="Bike name" />
                        <textarea className=" rounded" {...register("description")} placeholder="Review" />
                        <Button sx={{ width: "100%", letterSpacing: 4 }} type="submit" variant="contained">Submit</Button>
                    </form>
                </div>
            </div>
            <div>
                <h3 className="text-center text-warning py-4">Top Reviews</h3>
                {/* <Reviews></Reviews> */}
            </div>
        </div>
    );
};

export default Review;