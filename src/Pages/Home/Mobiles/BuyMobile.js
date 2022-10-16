/* import { Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth/useAuth'; */
import React,{ useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
/* import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; */
// import { Modal } from 'react-responsive-modal';
// import 'react-responsive-modal/styles.css';
import { addToBuy } from "../../../Redux/slices/buyNowSlice";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt } from "../../../Redux/slices/fvrtSlice";
import { numberFormat } from '../../../Shared/numberFormat';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { FaLuggageCart } from "react-icons/fa";

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
   const {_id,image,price,name,brand,os} = mobile;
  //  console.log(mobile);
  const [counter, setCounter] = useState(1);

    const decrement = () => {
        if (counter === 1) {
            setCounter(counter)
        }
        else (
            setCounter((prevCount)=>prevCount - 1)
        )
    }     
 const increment = () =>{
      setCounter((prevCount)=>prevCount +1);
    }
    

    const detailProduct = {
      _id: _id,
      os: os,
      name: name,
      image: image,
      brand: brand,
      price:  price,
      cartQuantity: counter,
  }

// console.log(detailProduct);


   const dispatch = useDispatch();

/*    const handleAddToCart = (_id) => {
    dispatch(addToCart(_id))
} */

// console.log(handleAddToCart);
   

/*    const {cartTotal, cartTotalQuantity} = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotal());
      }, [dispatch]); */
   
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
                <span className="fs-3 fw-bold ">{numberFormat(price).slice(3,-3)}</span> /1
              </h5>
            <div className="m-auto row">
                <div className="col-md-6 col-6">
                  <div style={{width:"10vw"}} className="d-flex justify-content-center border mx-auto">
                    <button className='btn w-100 btn-cart' onClick={decrement}> - </button>
                    <input style={{width:"4vw"}} type="text" readOnly value={counter}
                      className="fw-bolder border-0 text-center text-secondary" />
                    <button className='btn w-100 btn-cart' onClick={increment}> + </button>
                  </div>
                </div>
              <div className="col-md-6 col-6">
                
                <Link className='text-light mx-2' to={`/buy/placeOrder`}>
                  <button onClick={() => dispatch(addToBuy(detailProduct))}
                   className="btn  btn-custom w-100 rounded-0"> <span> <FaLuggageCart/> </span>
                   Buy Now 
                  </button>
                </Link>
               
              </div>
                  
            </div>
              <button
                onClick={() => dispatch(addToCart(mobile))}
                className="btn btn-custom rounded-0 w-100 mx-2 mb-0 mt-3"
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