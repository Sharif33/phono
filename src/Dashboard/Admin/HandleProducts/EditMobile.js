import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth/useAuth';

const EditMobile = () => {
    const { id } = useParams();

    const {user} = useAuth();

    const [phones, setPhones] = useState({});
    // console.log(phones);

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
       
        try {
          async function callApi() {
              let data = await fetch(`http://localhost:5000/mobiles/${id}`)
              data = await data.json();
              if(isMounted ){ 
                  setPhones(data);
              }
            }
            callApi(); 
            return () => {
            isMounted = false;
            };
        }
        catch (error) {
            console.log ('error',error)
          }  
    }, [id]);

    const [fieldsValue, setFieldsValue] = useState({});
  
    // GET ALL THE VALUES FROM 
    const handleGetFieldValues = (e) => {

        const field = e.target.name
        const value = e.target.value
        const newFieldData = {
            ...fieldsValue
        }
        newFieldData[field] = value
        setFieldsValue(newFieldData)

    }
    
    // const [success, setSuccess] = useState(false);
    const handleUpdate = e => {
        const bodyInfo={...fieldsValue, updated_date:new Date().toDateString(),
            updated_time:new Date().toLocaleTimeString(), updater_name:user?.name ? user.name : user.displayName, updater_email:user.email}
            Swal.fire({
                title: 'Are you sure?',
                text: "You wanted to update this!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#ec0554', 
                confirmButtonText: 'Yes, update it!',
                cancelButtonText: 'No, keep me!'
              }).then((result) => {
                if (result.isConfirmed) 
             {
        fetch(`http://localhost:5000/mobiles/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bodyInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Swal.fire(
                        'Done!',
                        'Updated successfully!',
                        'success'
                      )
                    setPhones(phones);
                    navigate(`/dashboard/manageProducts`);
                }
            })

       
        }
        });
         e.preventDefault()
    }


   /*  const handleUpdate = (data) => {
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

            axios.put(`http://localhost:5000/mobiles/${id}`,data) 
            .then(res=>{
                    if (res.data) {
                        Swal.fire(
                            'Done!',
                            'Updated successfully!',
                            'success'
                          )
                        // window.location.reload();
                        setPhones(data);
                        reset();
                    }
                })
        }
    });

    }; */

    return (
        <>
        <div className='container'>
        <h3 className="text-center">Edit <span className='text-danger'> {phones?.name}</span></h3>
         {
            phones?.name && <form  className='pt-4' onSubmit={handleUpdate}>
        <ul className="list-group">
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="name"
               defaultValue={phones.name}
                onBlur={handleGetFieldValues}
                 label="Mobile Name" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="released_at"
               defaultValue={phones?.released_at}
                onBlur={handleGetFieldValues}
                 label="Released" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Colors"
               defaultValue={phones?.specifications?.Colors}
                onBlur={handleGetFieldValues}
                 label="Colors" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Models"
               defaultValue={phones?.specifications?.Models}
                onBlur={handleGetFieldValues}
                 label="Models" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
    <TextField 
               sx={{ width:"100%" }}
               name="price"
              type="number"
                onBlur={handleGetFieldValues} 
                 label="Price"
                 defaultValue={phones?.price}
                  variant="outlined" />
                  <span >
                 <select className='p-3 ms-2 rounded w-100' onBlur={handleGetFieldValues} name="brand" defaultValue={phones?.brand}>
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
                 </span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
    <TextField
               sx={{ width:"100%" }}
               name="ram"
               defaultValue={phones?.ram}
                onBlur={handleGetFieldValues}
                 label="Ram" variant="outlined" /> 
    <span> <TextField
                sx={{ ml:1,width:"100%" }}
               name="chipset"
               defaultValue={phones?.chipset}
                onBlur={handleGetFieldValues}
                 label="Chipset" variant="outlined" /></span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="storage"
               defaultValue={phones?.storage}
                onBlur={handleGetFieldValues}
                 label="Storage" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="body"
               defaultValue={phones?.body}
                onBlur={handleGetFieldValues}
                 label="Body" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Protection"
               defaultValue={phones?.specifications?.Protection}
                onBlur={handleGetFieldValues}
                 label="Protection" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Resolution"
               defaultValue={phones?.specifications?.Resolution}
                onBlur={handleGetFieldValues}
                 label="Resolution" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Sensors"
               defaultValue={phones?.specifications?.Sensors}
                onBlur={handleGetFieldValues}
                 label="Sensors" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Build"
               defaultValue={phones?.specifications?.Build}
                onBlur={handleGetFieldValues}
                 label="Build" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.CPU"
               defaultValue={phones?.specifications?.CPU}
                onBlur={handleGetFieldValues}
                 label="CPU" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Dimensions"
               defaultValue={phones?.specifications?.Dimensions}
                onBlur={handleGetFieldValues}
                 label="Dimensions" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Display"
               defaultValue={phones?.specifications?.Display}
                onBlur={handleGetFieldValues}
                 label="Display" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
    <TextField
               sx={{ width:"100%" }}
               name="camera_pixels"
               defaultValue={phones?.camera_pixels}
                onBlur={handleGetFieldValues}
                 label="Camera" variant="outlined" /> 
    <span> <TextField
                sx={{ ml:1,width:"100%" }}
               name="video_pixels"
               defaultValue={phones?.video_pixels}
                onBlur={handleGetFieldValues}
                 label="Video" variant="outlined" /></span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
    <TextField
               sx={{ width:"100%" }}
               name="battery_size"
               defaultValue={phones?.battery_size}
                onBlur={handleGetFieldValues}
                 label="Battery Size" variant="outlined" /> 
    <span> <TextField
                sx={{ ml:1,width:"100%" }}
               name="battery_type"
               defaultValue={phones?.battery_type}
                onBlur={handleGetFieldValues}
                 label="Battery Type" variant="outlined" /></span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.BatteryLife"
               defaultValue={phones?.specifications?.BatteryLife}
                onBlur={handleGetFieldValues}
                 label="Battery Life" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
        <TextField
                sx={{ width:"100%" }}
               name="specifications.Charging"
               defaultValue={phones?.specifications?.Charging}
                onBlur={handleGetFieldValues}
                 label="Charging" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
    <TextField
                sx={{ width:"100%" }}
               name="os"
               defaultValue={phones?.os}
                onBlur={handleGetFieldValues}
                 label="Operating System" variant="outlined" /> 
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
    <TextField
                sx={{mb:2, width:"100%" }}
               name="image"
               defaultValue={phones?.image}
                onBlur={handleGetFieldValues}
                 label="Image URL" variant="outlined" />
    </li>
    
    </ul>  
         <button className='ms-3 btn btn-cart' type="submit">Save</button>
        </form>
        }
        </div>
        </>
    );
};

export default EditMobile;