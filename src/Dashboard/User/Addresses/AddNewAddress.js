import React, { useState } from 'react';
import { Button, Chip, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { CloseOutlined } from "@mui/icons-material";
import { toast } from 'react-toastify';

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

const AddNewAddress = ({newAddress,setNewAddress}) => {
  const [address, setAddress] = useState({});

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    setNewAddress(address);
    toast.success('New billing address added');
    handleClose();
  }

  const handleGetFieldValues = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newFieldData = {
      ...address
    }
    newFieldData[field] = value
    setAddress(newFieldData)
  }
  const [openAddress, setOpenAddress] = React.useState(false);
  const handleOpen = () => setOpenAddress(true);
  const handleClose = () => setOpenAddress(false);

    return (
        <>
        <Box sx={{ display: { md: 'flex' }, alignItems: 'center', bgcolor: '#F4F8F9', justifyContent: 'space-between', p: 2, my: 2 }}>
                        <Box>
                          <Typography variant='button' display="block">
                            {newAddress?.name}
                          </Typography>
                          <Typography variant='body2' display="block">
                            {newAddress?.address}
                          </Typography>
                          <Typography variant='body2' display="block">
                            {newAddress?.city} {newAddress?.zip}
                          </Typography>
                          <Typography variant='body2'>
                            {newAddress?.country}
                          </Typography>
                          <Typography variant='body2'>
                            {newAddress?.email}
                          </Typography>
                          <Typography variant='body2' display="block">
                            {newAddress?.phone}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip sx={{ p: 1, mt: { xs: 2, md: 0, sm: 2 } }} onClick={handleOpen} color='secondary' size='large' icon={<AddIcon />} label="Add New Address" variant="outlined" />
                        </Box>
                      </Box>
                      <Modal
                    open={openAddress}
                    onClose={handleClose}
                    aria-labelledby="my-modal-title2"
                    aria-describedby="my-modal-description2"
                  >
                    <Box sx={style}>
                      <div className="rounded">
                        <form className='pt-4' onSubmit={handleAddressSubmit}>
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                              <TextField
                                sx={{ width: "100%" }}
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
                              </span>

                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                              <TextField
                                sx={{ width: "100%" }}
                                name="email"
                                type='email'
                                onBlur={handleGetFieldValues}
                                label="Your Email" variant="outlined" />
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                              <TextField
                                sx={{ width: "100%" }}
                                required
                                name="address"
                                onBlur={handleGetFieldValues}
                                label="Your Address" variant="outlined" />
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                              <TextField
                                sx={{ width: "100%" }}
                                name="city"
                                onBlur={handleGetFieldValues}
                                label="City" variant="outlined" />
                              <span> <TextField
                                sx={{ ml: 1 }}
                                name="zip"
                                onBlur={handleGetFieldValues}
                                label="Postal code" variant="outlined" /></span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                              <TextField
                                sx={{ width: "100%" }}
                                name="country"
                                onBlur={handleGetFieldValues}
                                label="Country" variant="outlined" />
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0">
                              <TextField
                                sx={{ mb: 2, width: "100%" }}
                                name="phone"
                                required
                                onBlur={handleGetFieldValues}
                                label="Phone Number" variant="outlined" />
                            </li>

                          </ul>
                          <Stack sx={{ px: 2 }} direction="row" spacing={2}>
                            <Button onClick={handleClose} variant="outlined" color="error" startIcon={<CloseOutlined />}>
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
        </>
    );
};

export default AddNewAddress;