import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddMobile = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        // console.log(data);

        axios.post(`https://peaceful-shore-84874.herokuapp.com/phones`, data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('added successfully');
                    reset();
                }
            })
    }
    return (
        <div className="add-bikes p-4 col-md-6 mx-auto">
        <div className="shadow p-4 rounded bg-custom">
            <h3 className="text-custom">Add a mobile</h3>
            <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 100 })} placeholder="Name" />
                <input {...register("specs", { required: true, maxLength: 300 })} placeholder="Key Specification" />
                <input {...register("processor")} placeholder="Processor" />
                <input {...register("memory")} placeholder="Memory" />
                <input {...register("display")} placeholder="Display Information" />
                <input {...register("battery")} placeholder="Baterry" />
                <input {...register("camera")} placeholder="Camera" />
                <input {...register("selfie")} placeholder="Selfie camera" />
                <input {...register("network")} placeholder="Network" />
                <input type="number" {...register("id")} placeholder="ID" />
                <input type="number" {...register("contact")} placeholder="Phone Number" />
                <input type="number" {...register("price")} placeholder="Price" />
                <input type="number" step="0.1" min='1' max='5' {...register("star")} placeholder="Rating" />
                <input type="number" {...register("rating")} placeholder="Reviews" />
                <input {...register("image")} placeholder="image url" />
                <input className="btn btn-primary" type="submit" />
            </form>
        </div>
    </div>
    );
};

export default AddMobile;