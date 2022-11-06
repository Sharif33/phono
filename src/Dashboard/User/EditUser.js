import React, { useState } from 'react';
// import { Modal } from 'react-responsive-modal';
// import 'react-responsive-modal/styles.css';
import useAuth from '../../Hooks/useAuth/useAuth';
import { Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:"90vw", sm: "90vw", md:"40vw"},
  bgcolor: 'background.paper',
 borderRadius:'7px',
  boxShadow: 24,
  p: 4,
//   overflowY:"scroll"
};

const EditUser = ({openUserNow,handleClose}) => {
    const {user} = useAuth();
    // const [vendors, setVendors] = useState([]);
    // console.log(vendors);
    const navigate = useNavigate();
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
        fetch(`https://phono-server-production.up.railway.app/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bodyInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount>0) {
                    // console.log(data);
                    // setVendors(data)
                    navigate(`/dashboard`);
                    setSuccess(true);
                    handleClose();
                    
                }
            })

        e.preventDefault()
    }

    setTimeout(() => {
        setSuccess(false)
    }, 15000);
   
    return (
        <div>
            {
            success && <Alert severity="success">Updated successfully!</Alert>
           
            } 
                <Modal
                open={openUserNow}
                onClose={handleClose}
                aria-labelledby="my-modal-title2"
                aria-describedby="my-modal-description2"
              >
                  <Box sx={style}>
                  <div style={{marginTop:"-1.8rem",marginRight:"-1.8rem"}} className="text-end">
                    <button onClick={handleClose} className='btn text-danger'><CloseIcon/></button>
                  </div>
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
                 <button className='ms-3 btn btn-purple' type="submit">Save</button>
                </form>
                
            </div>
        </Box>

                
           
              </Modal>
             
        </div>
    );
};

export default EditUser;