import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth/useAuth';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

const BuyMobile = ({openBuyNow,handleClose,mobile}) => {
    const { user, admin } = useAuth();

    // const { id } = useParams();

    // const [mobile, setmobile] = useState([]);

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // useEffect(() => {
    //     fetch(`https://peaceful-shore-84874.herokuapp.com/mobile/${id}`)
    //         .then(res => res.json())
    //         .then(data => setmobile(data))
    // }, [id])


    // post bike

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data);
        handleClose();

        axios.post(`https://peaceful-shore-84874.herokuapp.com/orders`, data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Purchase successfully.Please Check My Order');
                    reset();
                }
            })
    }


    return (
        <div>
            <Modal
        open={openBuyNow}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className='mx-auto'>
                        <div className="py-1 rounded">
                            <h5 className='text-center p-2'>{mobile?.name}</h5>
                            <div>
                                {
                                    mobile?.name && <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
                                         <input placeholder="Your Name"  {...register("fullName", { required: true })} />
                                        {errors.fullName && <span className="text-warning">This field is required. </span>}
                                        <input defaultValue={mobile?.name} hidden readOnly {...register("mobile", { required: true })} />
                                        {errors.mobile && <span className="text-warning">This field is required. </span>}
                                        <input defaultValue={mobile?.price} hidden readOnly {...register("price")} />
                                        <input defaultValue="Pending..." readOnly hidden {...register("status")} />
                                        <input defaultValue={user?.displayName} hidden readOnly {...register("name")} />
                                        <input defaultValue={user?.email} hidden readOnly {...register("email", { required: true })} />
                                        {errors.email && <span className="text-warning">This field is required.</span>}
                                        <input placeholder="Address"  {...register("address")} />
                                        <input placeholder="City and Country"  {...register("city")} />
                                        <input placeholder="Phone number"  {...register("phone", { required: true })} />
                                        {errors.phone && <span className="text-warning">This field is required.</span>}
                                        <input defaultValue={date} type="date"  {...register("date", { required: true })} />
                                        <input defaultValue={time} type="time"  {...register("time", { required: true })} />
                                        {errors.date && <span className="text-warning">This field is required.</span>}
                                        <input defaultValue={mobile?.image} hidden readOnly {...register("image", { required: true })} />
                                        {errors.image && <span className="text-warning">This field is required.</span>} <br />
                                        <Button className='w-100 btn-custom-3' type="submit" variant="contained">ORDER</Button>

                                    </form>
                                }
                            </div>
                        </div>
                    </div>
        </Box>
      </Modal>
            
        </div>
    );
};

export default BuyMobile;