import axios from 'axios';
import React,{useState}  from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth/useAuth';

const AddOffers = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    /* Image Added section */
    const [imageSrc, setImageSrc] = useState();
    
    const handleProductImageUpload = (e) => {
      const file = e.target.files[0];
  
      TransformFileData(file);
    };
  
    const TransformFileData = (file) => {
      const reader = new FileReader();
  
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
      } else {
        setImageSrc("");
      }
    };

    /* Post API section */

    const { register, handleSubmit, reset } = useForm();

     const onSubmit = (data) => {
        data.image=imageSrc;
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();
        data.adder=user?.displayName;
        data.adderEmail=user?.email;
        
        axios.post(`http://localhost:5000/phones`, data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'Added Successfully!',
                        'success'
                      )
                    reset();
                    navigate(`/dashboard/manageOffers`);
                }
                
            })
    }
    return (
        <div className=" col-md-12 col-lg-9 col-sm-12 mx-auto">
        <div className="py-3 rounded">
            <h3 className="text-custom">Offer Added Section</h3>
            <form encType='multipart/form-data' className='custom-form' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 100 })} placeholder="Name" />      
                <select {...register("brand", { required: true })}>
                <option>Select brand name</option>
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
                <input {...register("specs", { required: true, maxLength: 300 })} placeholder="Key Specification" />
                <input {...register("processor")} placeholder="Processor" />
                <input {...register("memory")} placeholder="Memory" />
                <input {...register("display")} placeholder="Display Information" />
                <input {...register("battery")} placeholder="Baterry" />
                <input {...register("camera")} placeholder="Camera" />
                <input {...register("selfie")} placeholder="Selfie camera" />
                <input {...register("network")} placeholder="Network" />
                <input {...register("offerTill")} placeholder="offerTill. ex: May 30,2022" />
                <input {...register("id")} placeholder="ID" />
                <input type="number" {...register("contact")} placeholder="Phone Number" />
                <input type="number" {...register("price")} placeholder="Price" />
                <input type="number" step="0.1" min='1' max='5' {...register("star")} placeholder="Rating (out of 5)" />
                <input type="number" {...register("rating")} placeholder="Reviews" />
                <input  id="imgUpload" accept="image/*" type="file"
                onChange={handleProductImageUpload} />

                {
                imageSrc && (
                    <>
                      <img style={{width:"7rem"}} className='img-fluid' src={imageSrc} alt="error!" />
                    </>) 
                }

                <input className="btn btn-primary" type="submit" />
            </form>
        </div>
    </div>
    );
};

export default AddOffers;