import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../Shared/Header/Header';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Favourite } from '../../../Contexts/AuthProvider/FavContext';
import { addToCart } from '../../../Redux/slices/cartSlice';
// import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import { removeFromFvrt } from '../../../Redux/slices/fvrtSlice';
import Footer from '../../../Shared/Footer/Footer';
import {Helmet} from "react-helmet";
import { MdAddShoppingCart,MdOutlineFavorite,MdOutlineCompareArrows } from "react-icons/md";
import { numberFormat } from '../../../Shared/numberFormat';
import { addToCompare } from '../../../Redux/slices/compareSlice';

const Favourite = () => {
    const {addToFvrt} = useSelector((state) => state.fvrt);
    const dispatch = useDispatch();
    return (
       <div>
           <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Wishlist</title>
                <link rel="canonical" href="/fvrt" />
            </Helmet>
          
           <Header/>
        {
            addToFvrt?.length ? <div className="container">
                <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
           {
               addToFvrt?.map((mobile)=>(
                  <div key={mobile?.id}>
                 <div className="col rounded text-center">
                <div className="card pb-3 border-0 h-100">
                    <div className='card-hover rounded py-3'>
                        <div>
                            {
                                mobile?.os ? <Link style={{textDecoration:"none"}} to={`/mobile/${mobile._id}`}>
                            <img style={{ height: "12rem" }} src={mobile?.image} className="img-fluid rounded-start" alt="" />
                            <h5 className="text-dark pt-1">{mobile?.name}</h5>
                            <p className="text-danger fw-bold">{numberFormat(mobile?.price).slice(3,-3)}Tk</p>
                        </Link> : 
                        <Link style={{textDecoration:"none"}} to={`/mobile2/${mobile?._id}`}>
                            <img style={{ height: "12rem" }} src={mobile?.image} className="img-fluid rounded-start" alt="" />
                            <h5 className="text-dark pt-1">{mobile?.name}</h5>
                            <p className="text-danger fw-bold">{numberFormat(mobile?.price).slice(3,-3)}Tk</p>
                        </Link>
                            }
                       
                        
                        </div>
                    <div className='d-flex justify-content-evenly'>
                    <button onClick={() => dispatch(addToCart(mobile))} className='btn btn-cart border-0 my-2 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button> 

                    <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn btn-cart border-0 my-2 rounded'> <MdOutlineFavorite title='Remove from Favourite' className="fs-3 p-1"/> </button>

                    <button onClick={() => dispatch(addToCompare(mobile))} className='btn btn-cart border-0 my-2 rounded'><MdOutlineCompareArrows className='fs-3 p-1'/></button>
                        </div>
                            
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
                        {/* <div>
                            <button onClick={() => dispatch(addToFvrt(mobile))} className='btn btn-outline-warning mx-2'> <i title='Add to Favourite' className="far fa-heart"></i> </button>
                          
                                <button onClick={() => dispatch(removeFromFvrt(mobile))} className='btn btn-outline-dark border-0 mx-2 rounded-circle'> <i title='Remove From Favourite' className="fas fa-heart fs-4 py-1"></i> </button>
                            
                        </div> */}
                    </div>
                   
                </div>
            </div>
                  </div> 
               ))
           }
           </div>
           </div> : <div className='text-center my-5'>
            <div className='d-flex justify-content-center'>
           <lottie-player src="https://assets9.lottiefiles.com/private_files/lf30_gctc76jz.json" background="transparent" speed="1" style={{ width: "20rem" }} loop autoplay></lottie-player>
           </div>
           <h4>Your wishlist is empty, Please add some products.</h4> <br />
            <Link to={`/mobiles`}><button className="btn btn-lg btn-custom-2">Start shopping now</button></Link>
           </div> 
        }
           
           
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