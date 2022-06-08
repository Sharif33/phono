import axios from 'axios';
import React  from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth/useAuth';
import './AddMobile.css';

const AddMobile = () => {

    const {user} = useAuth();
    // const [image,setImage]= useState("");
    // const [url,setUrl] = useState("");
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        // console.log(data);
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();
        data.adder=user?.displayName;
        // console.log(data.adder);
        data.adderEmail=user?.email;
        /* const img = new FormData()
        img.append("file",image)
        img.append("upload_preset","phono-sj0vxcq0")
        img.append("cloud_name","dulelqrvl")
        fetch("https://api.cloudinary.com/v1_1/dulelqrvl/image/upload",{
            method:"post",
            body:img
        })
        .then(res=>res.json())
        .then(img=>{
           setUrl(img.url)
        })
        .catch(err=>{
            console.log(err)
        })
 */
        axios.post(`https://peaceful-shore-84874.herokuapp.com/mobiles`, data)
            .then(res => {
                if (res.data.insertedId) {
                    
                    Swal.fire(
                        'Good job!',
                        'Added Successfully!',
                        'success'
                      )
                    reset();
                }
            })
    }
    return (
        <div className=" col-md-12 col-lg-9 col-sm-12 mx-auto">
        <div className="py-3 rounded">
            <h3 className="text-custom">Moblie Added Section</h3>
            <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
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
                <input {...register("specifications.Technology")} placeholder="Technology" />
                <input {...register("specifications.ram")} placeholder="ram" />
                <input {...register("specifications.CPU")} placeholder="CPU" />
                <input {...register("image")} placeholder="image url" />
                {/* <input type="file" onChange={(e)=>setImage(e.target.files[0])} {...register("image")} placeholder="image url" /> */}
                <input className="btn btn-primary" type="submit" />
            </form>
        </div>
    </div>
    );
};

export default AddMobile;