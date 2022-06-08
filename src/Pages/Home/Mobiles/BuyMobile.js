/* import { Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth/useAuth'; */
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
/* import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; */
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { addToCart } from "../../../Redux/slices/cartSlice";
import { addToFvrt } from "../../../Redux/slices/fvrtSlice";
import { useDispatch } from 'react-redux';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//  borderRadius:'10px',
//   boxShadow: 24,
//   p: 4,
// };

const BuyMobile = ({openBuyNow,handleClose,mobile}) => {
   const {image,price,name,brand} = mobile;
   const dispatch = useDispatch();
   
    return (
        <div style={{position:"absolute"}}>
         <Modal
                open={openBuyNow}
                onClose={handleClose}
                center
                aria-labelledby="my-modal-title"
                aria-describedby="my-modal-description"
              >
                <div className="row">
                    <div className="col-md-6 col-sm-12 m-auto">
                    <img  src={image} className="img-fluid rounded-start" alt="" />  
                    </div>
                    <div className="col-md-6 col-sm-12 m-auto pt-md-3">
                        <h4>{name}</h4>
                        <h6>Brand : {brand}</h6>
                        <h6>Avaibility : <small>In Stock</small> </h6>
                        <h5 className="w-100 py-3">
                <span className="text-danger fw-bold"> Tk </span>{" "}
                <span className="fs-3 fw-bold ">{price}</span> .00
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
            </Modal>
        </div>
    );
};

export default BuyMobile;