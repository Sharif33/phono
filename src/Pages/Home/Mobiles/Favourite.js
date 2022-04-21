import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../Shared/Header/Header';
import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import { addToCart } from '../../../Redux/slices/cartSlice';
// import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import Footer from '../../../Shared/Footer/Footer';
// import BuyMobile from './BuyMobile';

const Favourite = () => {
    const {addToFvrt} = useSelector((state) => state.fvrt);
    const dispatch = useDispatch();
    return (
       <div style={{paddingTop:"70px"}}>
          
           <Header/>
           
           <div className="row row-cols-1 row-cols-md-3 m-2 g-4">
           {
               addToFvrt?.map((mobile)=>(
                  <div key={mobile?.id}>
                 <div className="col rounded text-center">
                <div className="card card-hover shadow h-100">
                    <div className='row flex-row-reverse px-3 py-2 g-0'>
                    <div className='col-md-4'>
                            <img style={{ height: "12rem" }} src={mobile?.image} className="img-fluid rounded-start" alt="" />
                            <p>Tk: <span className="text-danger fw-bold">{mobile?.price}</span></p>
                        </div>
                        <div className='col-md-8'>
                            <h5 className="text-dark pt-1">{mobile?.name}</h5>
                            <Box sx={{
                                '& > legend': { mt: 2 },
                            }}>
                                <Rating name="half-rating-read" precision={0.5} size="small" value={Number(mobile?.star)} readOnly />
                            </Box>
                            <div style={{ textAlign: "justify" }} className="p-2">
                                <p className="text-secondary">{mobile?.specs}</p>
                            </div>
                            <div className="text-center d-flex justify-content-center alighn-items-center">
                        <Link to={`/mobile/${mobile?._id}`}> <button className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Details' className="fas fa-info-circle fs-4 py-1"></i> </button> </Link>

                        <button onClick={() => dispatch(addToCart(mobile))} className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Add to Cart' className="fas fa-cart-plus fs-4 py-1"></i> </button>
                       
        
                  {/*       <div>
                           {
                            cart.includes(mobile) ? (
                              <button onClick={()=>{setCart(cart.filter((c)=>c.id !== mobile?.id))}} className='btn btn-outline-warning mx-2'> <i title='Remove from Favourite' className="fas fa-heart"></i> </button>  
                            )
                            :
                            (
                            <button onClick={()=>{setCart([...cart,mobile])}} className='btn btn-outline-warning mx-2'> <i title='Add to Favourite' className="far fa-heart"></i> </button>
                            )
                        }   
                        </div> */}
                        <div>
                            {/* <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-outline-warning mx-2'> <i title='Add to Favourite' className="far fa-heart"></i> </button> */}
                          
                                <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Remove From Favourite' className="fas fa-heart fs-4 py-1"></i> </button>
                              
                            
                            
                        </div>
                    
                    </div>
                        </div>
                    </div>
                   
                </div>
            </div>
                  </div> 
               ))
           }
           </div>
           
           {/* <div style={{paddingTop:"70px"}}>
               <h1>{cart.length}</h1>
           </div>
           {
               cart.map((mobile)=>(
                  <Mobile
                  mobile={mobile}
                  key={mobile.id}
                  /> 
               ))
           } */}
           <Footer/>
       </div>
         
    );
};

export default Favourite;