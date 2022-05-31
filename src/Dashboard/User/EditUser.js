import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import useAuth from '../../Hooks/useAuth/useAuth';
import { Alert, Button, TextField } from '@mui/material';

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
                <form  className='pt-5' onSubmit={handleAdminSubmit}>
                    <TextField style={{width:"100%"}}
                        sx={{ mb: 2 }}
                       name="address"
                        onBlur={handleGetFieldValues}
                         label="Your Address" variant="outlined" /> <br />
                    <TextField
                        sx={{ mb: 2 }}
                       name="city"
                        onBlur={handleGetFieldValues}
                         label="City" variant="outlined" /> <br />
                    <TextField
                        sx={{ mb: 2 }}
                       name="country"
                        onBlur={handleGetFieldValues}
                         label="Country" variant="outlined" /> <br />
                    <TextField
                        sx={{ mb: 2 }}
                       name="zip"
                        onBlur={handleGetFieldValues}
                         label="Postal code" variant="outlined" /> <br />
                    <TextField
                        sx={{ mb: 2 }}
                       name="gender"
                        onBlur={handleGetFieldValues}
                         label="Gender" variant="outlined" /> <br />
                    <TextField
                        sx={{ mb: 2 }}
                       name="phone"
                        onBlur={handleGetFieldValues}
                         label="Phone Number" variant="outlined" /> <br />
                    <Button sx={{ m: 'auto' }} type="submit" variant="contained">Save</Button>
                </form>
                {success && <Alert severity="success">Update successfully!</Alert>}
            </div>
        </div>

                
           
              </Modal>
        </div>
    );
};

export default EditUser;