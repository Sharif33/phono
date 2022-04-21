import { Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth/useAuth';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    const { user} = useAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();
        

        axios.post(`https://peaceful-shore-84874.herokuapp.com/orders`, data)
            .then(res => {
                if (res.data.insertedId) {
                        Swal.fire(
                            'Thank You!',
                            'Purchase successfully.Please Check My Order',
                            'success'
                          )
                    reset();
                    handleClose();
                }
            })
    }


    return (
        <div>
            {
                user?.email ?  <Modal
                open={openBuyNow}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className='mx-auto'>
                                <div className="py-1 rounded">
                                    <h5 className='text-center p-2'>{mobile?.name}, {mobile?.price} Tk</h5>
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
                                                <input defaultValue={mobile?.image} hidden readOnly {...register("image", { required: true })} />
                                                {errors.image && <span className="text-warning">This field is required.</span>} <br />
                                                <Button className='w-100 btn-custom-3' type="submit" variant="contained">ORDER</Button>
        
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleClose} className='btn btn-dark'>X</button>
                </Box>
              </Modal>
              :
              <Modal
              open={openBuyNow}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className='mx-auto'>
                              <div className="py-1 rounded">
                                  <h5 className='text-center p-2'>{mobile?.name}</h5>
                                  <div className='text-center'>
                                      <p className='text-danger'>*Dear Customer Please Register First</p>
                                      <Link to="/register"><button className='btn-custom-3 btn'>REGISTER</button> </Link>
                                  </div>
                              </div>
                          </div>
              </Box>
            </Modal>
            }
        </div>
    );
};

export default BuyMobile;