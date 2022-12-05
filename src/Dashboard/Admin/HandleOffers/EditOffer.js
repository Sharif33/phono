import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, IconButton } from '@mui/material'
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';

const EditOffer = ({isDrawerOpen, setIsDrawerOpen, mobile, setMobiles, mobiles}) => {
    // const { id } = useParams();

    const navigate = useNavigate();

    const [mbl, setMbl] = useState({});
// console.log(mbl);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetch(`https://phono-server-production.up.railway.app/phones`)
            .then(res => res.json())
            .then(data => setMbl(data))
    }, [])

    const handleUpdate = (data) => {
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();
        // console.log(data);
        

            axios.put(`https://phono-server-production.up.railway.app/phones/${mobile?._id}`,data) 
            .then(res=>{
                    if (res.data) {
                        // console.log(data);
                        setMbl(mbl);
                        toast(`${mobile?.name} updated`)
                        // reset();
                        navigate(`/dashboard/manageOffers`);
                        setIsDrawerOpen(false);
                    }
                })
        }

    return (
        <Drawer anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
            <Box sx={{minWidth: {xs: "100vw", sm:"100vw",md: "50vw", lg:"50vw", xl:"50vw" }, position:"relative"}}  role='presentation'>
            <div className="p-3 bg-light d-flex justify-content-between align-items-center sticky-top">
                <h4 className="text-custom">Update <span className='text-danger'> {mobile?.name}</span></h4>
                <IconButton  onClick={() => setIsDrawerOpen(false)}>
                    <CloseIcon color="error" />
                </IconButton>
            </div>
          <div className="col-md-8 col-lg-9 col-sm-12 mx-auto">
        <div className="py-4">   
            {
                mobile?.name && <form className='custom-form-add mb-5' onSubmit={handleSubmit(handleUpdate)}>
                    <div className="d-flex">
                        <input {...register("name", { maxLength: 100 })} defaultValue={mobile?.name} />
                        <p className='bg-cart'>Name</p>
                    </div>
                <div className="d-flex">
                    <select {...register("brand")}>
                <option >{mobile?.brand}</option>
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
                <p className='bg-cart'>Brand</p>
                </div>
                <div className="d-flex">
                    <input {...register("specs", { maxLength: 300 })} defaultValue={mobile?.specs} />
                    <p className='bg-cart'>Key Specs.</p>
                </div>
                <div className="d-flex">
                <input {...register("processor")} defaultValue={mobile?.processor} />
                <p className='bg-cart'>Processor</p>
                </div>
                <div className="d-flex">
                <input {...register("memory")} defaultValue={mobile?.memory} />
                <p className='bg-cart'>Memory</p>
                </div>
                <div className="d-flex">
                <input {...register("display")} defaultValue={mobile?.display} />
                <p className='bg-cart'>Display</p>
                </div>
                <div className="d-flex">
                <input {...register("battery")} defaultValue={mobile?.battery} />
                <p className='bg-cart'>Battery</p>
                </div>
                <div className="d-flex">
                <input {...register("camera")} defaultValue={mobile?.camera} />
                <p className='bg-cart'>Camera</p>
                </div>
                <div className="d-flex">
                <input {...register("selfie")} defaultValue={mobile?.selfie} />
                <p className='bg-cart'>Selfie Camera</p>
                </div>
                <div className="d-flex">
                <input {...register("network")} defaultValue={mobile?.network} />
                <p className='bg-cart'>Network</p>
                </div>
                <div className="d-flex">
                <input {...register("offerTill")} defaultValue={mobile?.offerTill} />
                <p className='bg-cart'>OfferDate</p>
                </div>
                <div className="d-flex">
                <input type="number" {...register("id")} defaultValue={mobile?.id} />
                <p className='bg-cart'>ID</p>
                </div>
                <div className="d-flex">
                <input type="text" {...register("contact")} defaultValue={mobile?.contact} />
                <p className='bg-cart'>Contact</p>
                </div>
                <div className="d-flex">
                <input type="number" {...register("price")} defaultValue={mobile?.price} />
                <p className='bg-cart'>Price</p>
                </div>
                <div className="d-flex">
                <input type="number" step="0.1" min='1' max='5' {...register("star")} defaultValue={mobile?.star} />
                <p className='bg-cart'>Rating</p>
                </div>
                <div className="d-flex">
                <input type="number" {...register("rating")} defaultValue={mobile?.rating} />
                <p className='bg-cart'>Reviews</p>
                </div>
                <div className="d-flex">
                <input {...register("image")} defaultValue={mobile?.image} />
                <p className='bg-cart'>img URL</p>
                </div>
                <div className='py-3 bg-light w-100 mx-auto' style={{bottom:0, position:"fixed"}}>
                        <button className="btn bg-btn rounded-0 btn-lg w-25" type="submit">Update</button>
                </div>  
            </form>
            }
        </div>
        
    </div>  
    </Box>
        </Drawer>
    );
};

export default EditOffer;