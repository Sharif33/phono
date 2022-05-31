import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import useAuth from '../../Hooks/useAuth/useAuth';
import { Alert, TextField } from '@mui/material';

const EditUser = ({openUserNow,handleClose}) => {
    const {user} = useAuth();
    // const [vendors, setVendors] = useState([]);
    // console.log(vendors);
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

    const [success, setSuccess] = useState(false);
  const email = user.email;
    const handleAdminSubmit = e => {
        const bodyInfo={...fieldsValue,email:user.email}
        fetch(`https://peaceful-shore-84874.herokuapp.com/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bodyInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data);
                    // setVendors(data)
                    setSuccess(true);
                    handleClose();
                }
            })

        e.preventDefault()
    }

    setTimeout(() => {
        setSuccess(false)
    }, 1000);
   
    return (
        <div>
                <Modal
                open={openUserNow}
                onClose={handleClose}
                center
                aria-labelledby="my-modal-title"
                aria-describedby="my-modal-description"
              >
                  <div className="">
            <div className="rounded">
                <form  className='pt-4' onSubmit={handleAdminSubmit}>
                <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                <TextField
                        sx={{ width:"100%" }}
                       name="name"
                       required
                        onBlur={handleGetFieldValues}
                         label="Your Name" variant="outlined" />
                         <span >
                         <select className='p-3 ms-2 rounded' onBlur={handleGetFieldValues} name="gender">
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        </select>
                        {/* <TextField 
                        sx={{ ml: 1 }}
                       name="gender"
                        onBlur={handleGetFieldValues}
                         label="Gender" variant="outlined" />  */}
                         </span>
                
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
            <TextField 
                       sx={{ width:"100%" }}
                       name="address"
                        onBlur={handleGetFieldValues}
                         label="Your Address" variant="outlined" />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
            <TextField
                       sx={{ width:"100%" }}
                       name="city"
                        onBlur={handleGetFieldValues}
                         label="City" variant="outlined" /> 
            <span> <TextField
                        sx={{ ml:1 }}
                       name="zip"
                        onBlur={handleGetFieldValues}
                         label="Postal code" variant="outlined" /></span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
            <TextField
                        sx={{ width:"100%" }}
                       name="country"
                        onBlur={handleGetFieldValues}
                         label="Country" variant="outlined" /> 
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
            <TextField
                        sx={{mb:2, width:"100%" }}
                       name="phone"
                       required
                        onBlur={handleGetFieldValues}
                         label="Phone Number" variant="outlined" />
            </li>
            
            </ul>  
                 <button className='ms-3 btn btn-cart' type="submit">Save</button>
                </form>
                {success && <Alert severity="success">Added successfully!</Alert>}
            </div>
        </div>

                
           
              </Modal>
        </div>
    );
};

export default EditUser;