import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import { Alert, Button, Chip, CircularProgress, TextField, Typography } from '@mui/material';
import { EditOutlined, Add } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import PinDropIcon from '@mui/icons-material/PinDrop';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "90vw", sm: "90vw", md: "40vw" },
    bgcolor: '#F4F8F9',
    borderRadius: '7px',
    boxShadow: 24,
    p: 4,
    //   overflowY:"scroll"
};

const DefaultAddress = () => {
    const { user, defaultAdrs } = useAuth();
    const [fieldsValue, setFieldsValue] = useState({});

    const dfltAdrs = {...defaultAdrs,...fieldsValue};
   
    const adrs = localStorage.getItem('phonoUserDetails') ? JSON.parse(localStorage.getItem('phonoUserDetails')) : {} || [];

    const [isLoading, setIsLoading] = useState(false);
   
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

    const [openUserNow, setOpenUserNow] = React.useState(false);
    const handleOpen = () => setOpenUserNow(true);
    const handleClose = () => setOpenUserNow(false);

    const [success, setSuccess] = useState(false);
    const email = user.email;
    const handleAdminSubmit = e => {
        setIsLoading(true)
        const bodyInfo = { ...fieldsValue, email: user.email }
        async function updatePost() {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyInfo)
            };


            const response = await fetch(`http://localhost:5000/users/${email}`, requestOptions);
            const data = await response.json();
            
            if (data.modifiedCount > 0) {
                setIsLoading(false);
                localStorage.setItem("phonoUserDetails", JSON.stringify(dfltAdrs));
                setSuccess(true);
                handleClose();              
            }
        }
        // setUsers(...bodyInfo,users);
        updatePost();
        e.preventDefault()
    }

    setTimeout(() => {
        setSuccess(false)
    }, 15000);

    return (
        <div>
           <h5 className='text-start'><PinDropIcon color='secondary'/> Default Address</h5>
            {isLoading ? <span className='d-flex align-items-center'><CircularProgress color="secondary" /></span> 
            : 
            <Box sx={{ display: { md: 'flex' }, alignItems: 'center', bgcolor: '#F4F8F9', justifyContent: 'space-between', p: 2, my: 2 }}>
                <Box>
                    {
                        adrs?.phone ? <Box>
                            <Typography variant='button' display="block">
                                {adrs?.name}
                            </Typography>
                            <Typography variant='body2' display="block">
                                {adrs?.address}
                            </Typography>
                            <Typography variant='body2' display="block">
                                {adrs?.city} 
                                {adrs?.zip}
                            </Typography>
                            <Typography variant='body2'>
                                {adrs?.country}
                            </Typography>
                            <Typography variant='body2'>
                                {adrs?.email}
                            </Typography>
                            <Typography variant='body2' display="block">
                                {adrs?.phone}
                            </Typography>
                        </Box>
                            :
                            <span sx={{ my: 2 }}>*You haven't yet added your default billing address.</span>
                    }
                </Box>
                <Box>
                    <Chip sx={{ p: 1, mt: { xs: 2, md: 0, sm: 2 } }} onClick={handleOpen} color='secondary' size='large' icon={adrs?.phone ? <EditOutlined /> : <Add />} label={adrs?.phone ? "Edit Address" : "Add Address"} variant="outlined" />
                </Box>
            </Box>
            }
            
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
                    <div className="rounded">
                        <form className='pt-4' onSubmit={handleAdminSubmit}>
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                                    <TextField
                                        sx={{ width: "100%" }}
                                        defaultValue={adrs?.name}
                                        name="name"
                                        required
                                        onBlur={handleGetFieldValues}
                                        label="Your Name" variant="outlined" />
                                    <span >
                                        <select defaultValue={adrs?.gender} className='p-3 ms-2 rounded'
                                            onBlur={handleGetFieldValues} name="gender">
                                            <option>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        
                                    </span>

                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                                    <TextField
                                        sx={{ width: "100%" }}
                                        required
                                        defaultValue={adrs?.address}
                                        name="address"
                                        onBlur={handleGetFieldValues}
                                        label="Your Address" variant="outlined" />
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                                    <TextField
                                        sx={{ width: "100%" }}
                                        defaultValue={adrs?.city}
                                        name="city"
                                        onBlur={handleGetFieldValues}
                                        label="City" variant="outlined" />
                                    <span>
                                        <TextField
                                            type='number'
                                            sx={{ ml: 1 }}
                                            defaultValue={adrs?.zip}
                                            name="zip"
                                            onBlur={handleGetFieldValues}
                                            label="Postal code" variant="outlined" />
                                    </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                                    <TextField
                                        sx={{ width: "100%" }}
                                        defaultValue={adrs?.country}
                                        name="country"
                                        onBlur={handleGetFieldValues}
                                        label="Country" variant="outlined" />
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                                    <TextField
                                        sx={{ mb: 2, width: "100%" }}
                                        defaultValue={adrs?.phone}
                                        name="phone"
                                        required
                                        onBlur={handleGetFieldValues}
                                        label="Phone Number" variant="outlined" />
                                </li>

                            </ul>
                            <Stack sx={{ px: 2 }} direction="row" spacing={2}>
                                <Button onClick={handleClose} variant="outlined" color="error" startIcon={<CloseIcon />}>
                                    Cancel
                                </Button>
                                <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                                    Save
                                </Button>
                            </Stack>
                        </form>

                    </div>
                </Box>
            </Modal>

        </div>
        </div>
    );
};

export default DefaultAddress;