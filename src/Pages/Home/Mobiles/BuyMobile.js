/* import { Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth/useAuth'; */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
/* import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; */
// import { Modal } from 'react-responsive-modal';
// import 'react-responsive-modal/styles.css';
import { addToCart } from "../../../Redux/slices/cartSlice";
import { addToFvrt } from "../../../Redux/slices/fvrtSlice";
import { useDispatch } from 'react-redux';
import { numberFormat } from '../../../Shared/numberFormat';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:"90vw", sm: "90vw", md:"60vw"},
  bgcolor: 'background.paper',
 borderRadius:'7px',
  boxShadow: 24,
  p: 4,
};

const BuyMobile = ({openBuyNow,handleClose,mobile}) => {
   const {image,price,name,brand} = mobile;
   const dispatch = useDispatch();
   
    return (
        <>
         <Modal
                open={openBuyNow}
                onClose={handleClose}
                aria-labelledby="my-modal-title"
                aria-describedby="my-modal-description"
              >
                <Fade in={openBuyNow}>
                <Box sx={style}>
                  <div style={{marginTop:"-1.8rem",marginRight:"-1.8rem"}} className="text-end">
                    <button onClick={handleClose} className='btn text-danger'><CloseIcon/></button>
                  </div>
                  <div className="row m-auto">
                    <div className="col-md-5 col-sm-12 m-auto">
                      <div className='text-center'>
                        <img  src={image} className="img-fluid" alt="" />  
                      </div> 
                    </div>
                    <div className="col-md-6 col-sm-12 m-auto">
                        <h4>{name}</h4>
                        <h6>Brand : {brand}</h6>
                        <h6>Avaibility : <small>In Stock</small> </h6>
                        <h5 className="w-100 py-3">
                <span className="text-danger fw-bold"> Tk </span>{" "}
                <span className="fs-3 fw-bold ">{numberFormat(price).slice(3,-3)}</span> .00
              </h5>

              <button
                onClick={() => dispatch(addToCart(mobile))}
                className="btn btn-custom rounded-0 w-100 mx-2"
              >
                Add to cart
              </button>
<br /> <br />

              <button
                onClick={() => dispatch(addToFvrt(mobile))}
                className="btn btn-custom-2 rounded-0 w-100 mx-2"
              >
                <i title="Add to Favourite" className="far fa-heart"></i> Add to
                wishlist
              </button>
                </div>
                </div>
                </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default BuyMobile;