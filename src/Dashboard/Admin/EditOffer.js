import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditOffer = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [phones, setPhones] = useState({});

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones/${id}`)
            .then(res => res.json())
            .then(data => setPhones(data))
    }, [id])

    const handleUpdate = (data) => {
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();
        // console.log(data);
        Swal.fire({
            title: 'Are you sure?',
            text: "You wanted to update this!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec0554',
            cancelButtonText: 'No, keep me!',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {

            axios.put(`https://peaceful-shore-84874.herokuapp.com/phones/${id}`,data) 
            .then(res=>{
                    if (res.data) {
                        Swal.fire(
                            'Done!',
                            'Updated successfully!',
                            'success'
                          )
                        // window.location.reload();
                        // console.log(data);
                        setPhones(data);
                        reset();
                        navigate(`/dashboard/manageOffers`);
                    }
                })
        }
    });

    };

    return (
        <div className="col-md-11 col-lg-9 col-sm-12 mx-auto">
        <div className="py-4 rounded">
            <h3 className="text-custom">Update <span className='text-danger'> {phones?.name}</span></h3>
            {
                phones?.name && <form className='custom-form-add' onSubmit={handleSubmit(handleUpdate)}>
                    <div className="d-flex">
                        <input {...register("name", { maxLength: 100 })} defaultValue={phones?.name} />
                        <p className='btn-purple'>Name</p>
                    </div>
                <div className="d-flex">
                    <select {...register("brand")}>
                <option >{phones?.brand}</option>
                <option value="Realme">Realme</option>
                <option value="Huawei">Huawei</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiomi">Xiomi</option>
                <option value="Walton">Walton</option>
                <option value="Oppo">Oppo</option>
                <option value="Telinor">Telinor</option>
                <option value="1Plus">1Plus</option>
                <option value="Symphony">Symphony</option>
                </select>
                <p className='btn-purple'>Brand</p>
                </div>
                <div className="d-flex">
                    <input {...register("specs", { maxLength: 300 })} defaultValue={phones?.specs} />
                    <p className='btn-purple'>Key Specs.</p>
                </div>
                <div className="d-flex">
                <input {...register("processor")} defaultValue={phones?.processor} />
                <p className='btn-purple'>Processor</p>
                </div>
                <div className="d-flex">
                <input {...register("memory")} defaultValue={phones?.memory} />
                <p className='btn-purple'>Memory</p>
                </div>
                <div className="d-flex">
                <input {...register("display")} defaultValue={phones?.display} />
                <p className='btn-purple'>Display</p>
                </div>
                <div className="d-flex">
                <input {...register("battery")} defaultValue={phones?.battery} />
                <p className='btn-purple'>Battery</p>
                </div>
                <div className="d-flex">
                <input {...register("camera")} defaultValue={phones?.camera} />
                <p className='btn-purple'>Camera</p>
                </div>
                <div className="d-flex">
                <input {...register("selfie")} defaultValue={phones?.selfie} />
                <p className='btn-purple'>Selfie Camera</p>
                </div>
                <div className="d-flex">
                <input {...register("network")} defaultValue={phones?.network} />
                <p className='btn-purple'>Network</p>
                </div>
                <div className="d-flex">
                <input {...register("offerTill")} defaultValue={phones?.offerTill} />
                <p className='btn-purple'>OfferDate</p>
                </div>
                <div className="d-flex">
                <input type="number" {...register("id")} defaultValue={phones?.id} />
                <p className='btn-purple'>ID</p>
                </div>
                <div className="d-flex">
                <input type="text" {...register("contact")} defaultValue={phones?.contact} />
                <p className='btn-purple'>Contact</p>
                </div>
                <div className="d-flex">
                <input type="number" {...register("price")} defaultValue={phones?.price} />
                <p className='btn-purple'>Price</p>
                </div>
                <div className="d-flex">
                <input type="number" step="0.1" min='1' max='5' {...register("star")} defaultValue={phones?.star} />
                <p className='btn-purple'>Rating</p>
                </div>
                <div className="d-flex">
                <input type="number" {...register("rating")} defaultValue={phones?.rating} />
                <p className='btn-purple'>Reviews</p>
                </div>
                <div className="d-flex">
                <input {...register("image")} defaultValue={phones?.image} />
                <p className='btn-purple'>img URL</p>
                </div>
                <div className="text-end">
                    <button className="btn btn-dark w-100" type="submit">Update</button>
                </div>  
            </form>
            }
        </div>
    </div>
    );
};

export default EditOffer;