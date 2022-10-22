import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../Shared/Header/Header';
import { removeFromCompare, clearCompare } from '../../../Redux/slices/compareSlice';
import { addToCart } from '../../../Redux/slices/cartSlice';
import { addToFvrt } from '../../../Redux/slices/fvrtSlice';
import {Helmet} from "react-helmet";
import Footer from '../../../Shared/Footer/Footer';
import { MdAddShoppingCart,MdFavoriteBorder,MdDelete } from "react-icons/md";
import { Box, Rating } from "@mui/material";
import { numberFormat } from "../../../Shared/numberFormat";
import './Compare.css';

const Compare = () => {
    const dispatch = useDispatch();
    const {addToCompare} = useSelector((state) => state.compare);

    const item = addToCompare;
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Compare</title>
                <link rel="canonical" href="/compare" />
            </Helmet>
            <Header/>

            {
                addToCompare.length ? <div className='container py-4'>
                        <div className="tableContainer">

 
    <table>
        <thead>
         <tr>
            <th className="emptyCell text-center" title="Empty cell">
                    <button className='btn btn-outline-danger' onClick={()=>dispatch(clearCompare(item))}>Clear All</button>
                    <h5 className='pt-3'>Product Comparison</h5>
                    <small className='text-secondary'>({item?.length} selected)</small>               
            </th>
            <th scope="col">
                <div className='m-auto text-center'>
                    <div>
                       {
                        item[0]?.os ?
                        <Link title='See Details' to={`/mobile/${item[0]?._id}`}> <img style={{width:"5rem"}} className='img-fluid' src={item[0]?.image} alt="" />
                        </Link> 
                        :
                        <Link title='See Details' to={`/mobile2/${item[0]?._id}`}> <img style={{width:"5rem"}} className='img-fluid' src={item[0]?.image} alt="" />
                        </Link>
                        } 
                    </div>
                    <div className='mt-2'>
                        <h6 className='text-primary'>{numberFormat(item[0]?.price).slice(3,-3)}	&#x9F3;</h6>
                        <Box sx={{"& > legend": { mt: 1 },}}>
                            <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={Number(item[0]?.star)}
                                readOnly
                            />
                        </Box>
                    </div>
                </div>
                
                                            
            </th>
            {
               item[1] &&
               <th scope="col">
                <div className='m-auto text-center'>
                    <div>
                        {
                        item[1]?.os ?
                        <Link title='See Details' to={`/mobile/${item[1]?._id}`}> <img style={{width:"5rem"}} className='img-fluid' src={item[1]?.image} alt="" />
                        </Link> 
                        :
                        <Link title='See Details' to={`/mobile2/${item[1]?._id}`}> <img style={{width:"6.9rem"}} className='img-fluid' src={item[1]?.image} alt="" />
                        </Link>
                        }
                    </div>
                    <div className='mt-2'>
                        <h6 className='text-primary'>{numberFormat(item[1]?.price).slice(3,-3)}	&#x9F3;</h6>
                        <Box sx={{"& > legend": { mt: 1 },}}>
                            <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={Number(item[1]?.star)}
                                readOnly
                            />
                        </Box>
                    </div>
                </div>
           
            </th>
            }
            {
               item[2] &&
               <th scope="col">
                <div className='m-auto text-center'>
                    <div>
                        {
                        item[1]?.os ?
                        <Link title='See Details' to={`/mobile/${item[2]?._id}`}> <img style={{width:"5rem"}} className='img-fluid' src={item[2]?.image} alt="" />
                        </Link> 
                        :
                        <Link title='See Details' to={`/mobile2/${item[2]?._id}`}> <img style={{width:"6.9rem"}} className='img-fluid' src={item[2]?.image} alt="" />
                        </Link>
                        }
                    </div>
                    <div className='mt-2'>
                        <h6 className='text-primary'>{numberFormat(item[2]?.price).slice(3,-3)}	&#x9F3;</h6>
                        <Box sx={{"& > legend": { mt: 1 },}}>
                            <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={Number(item[2]?.star)}
                                readOnly
                            />
                        </Box>
                    </div>
                </div>
           
            </th>
            }
            
            
         </tr>
      </thead>
        <tbody >   
         <tr className="mobileColumnGroup">
            
            <th scope="colgroup" colSpan="3"><span>Name</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Name</th>
            <td>{item[0]?.name}</td>
            {item[1] && <td>{item[1]?.name}</td>}
            {item[2] && <td>{item[2]?.name}</td>}
         </tr>

         <tr className="mobileColumnGroup">
            
            <th scope="colgroup" colSpan="3"><span>Brand</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Brand</th>
            <td>{item[0]?.brand}</td>
            {item[1] && <td>{item[1]?.brand}</td>}
            {item[2] && <td>{item[2]?.brand}</td>}
         </tr>

         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>OS & Processor</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">OS & Processor</th>
            <td>{item[0]?.processor}- {item[0]?.os}</td>
            {item[1] && <td>{item[1]?.processor}- {item[1]?.os}</td>}
            {item[2] && <td>{item[2]?.processor}- {item[2]?.os}</td>}
         </tr>   

         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>Memory | Storage | Ram</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Memory | Storage | Ram</th>
            <td>{item[0]?.memory}- {item[0]?.storage} - {item[0]?.ram}</td>
            {item[1] && <td>{item[1]?.memory}- {item[1]?.storage} - {item[1]?.ram}</td>}
            {item[2] && <td>{item[2]?.memory}- {item[2]?.storage} - {item[2]?.ram}</td>}
         </tr>
         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>Display Size & Resolution</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Display Size & Resolution</th>
            <td>{item[0]?.display}- {item[0]?.display_size}- {item[0]?.display_resolution}</td>
            {item[1] && <td>{item[1]?.display}- {item[1]?.display_size}- {item[1]?.display_resolution}</td>}
            {item[2] && <td>{item[2]?.display}- {item[2]?.display_size}- {item[2]?.display_resolution}</td>}
         </tr>
         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>Battery</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Battery</th>
            <td>{item[0]?.battery}- {item[0]?.battery_size} - {item[0]?.battery_type}</td>
            {item[1] && <td>{item[1]?.battery}- {item[1]?.battery_size} - {item[1]?.battery_type}</td>}
            {item[2] && <td>{item[2]?.battery}- {item[2]?.battery_size} - {item[2]?.battery_type}</td>}
         </tr>
         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>Camera</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Camera</th>
            <td>{item[0]?.camera}- {item[0]?.camera_pixels} - {item[0]?.selfie}-{item[0]?.specifications?.single}</td>
            {item[1] && <td>{item[1]?.camera}- {item[1]?.camera_pixels} - {item[1]?.selfie}-{item[1]?.specifications?.single}</td>}
            {item[2] && <td>{item[2]?.camera}- {item[2]?.camera_pixels} - {item[2]?.selfie}-{item[2]?.specifications?.single}</td>}
         </tr>
         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>Network</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Network</th>
            <td>{item[0]?.network}- {item[0]?.specifications?.speed}</td>
            {item[1] && <td>{item[1]?.network}- {item[1]?.specifications?.speed}</td>}
            {item[2] && <td>{item[2]?.network}- {item[2]?.specifications?.speed}</td>}
         </tr>
         <tr className="mobileColumnGroup">
           
            <th scope="colgroup" colSpan="3"><span>Actions</span></th>
         </tr>
         <tr>
            <th scope="row" className="rowHeader">Actions</th>
            <td> 
                <div className='d-flex justify-content-evenly'>
                    <button onClick={() => dispatch(addToCart(item[0]))} className='btn btn-cart border-0 my-2 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button> 

                    <button onClick={() => dispatch(addToFvrt(item[0]))} className='btn btn-cart border-0 my-2 rounded'> <MdFavoriteBorder title='Add To Favourite' className="fs-3 p-1"/> </button>

                    <button onClick={() => dispatch(removeFromCompare(item[0]))} className='btn btn-cart border-0 my-2 rounded'><MdDelete className='fs-3 p-1 text-danger'/></button>
                </div>
            </td>
            {item[1] && <td>
            <div className='d-flex justify-content-evenly'>
                    <button onClick={() => dispatch(addToCart(item[1]))} className='btn btn-cart border-0 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button> 

                    <button onClick={() => dispatch(addToFvrt(item[1]))} className='btn btn-cart border-0 rounded'> <MdFavoriteBorder title='Add To Favourite' className="fs-3 p-1"/> </button>

                    <button onClick={() => dispatch(removeFromCompare(item[1]))} className='btn btn-cart border-0 rounded'><MdDelete title='Remove From Compare' className='fs-3 p-1 text-danger'/></button>
                </div>
            </td>}
            {item[2] && <td>
            <div className='d-flex justify-content-evenly'>
                    <button onClick={() => dispatch(addToCart(item[2]))} className='btn btn-cart border-0 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button> 

                    <button onClick={() => dispatch(addToFvrt(item[2]))} className='btn btn-cart border-0 rounded'> <MdFavoriteBorder title='Add To Favourite' className="fs-3 p-1"/> </button>

                    <button onClick={() => dispatch(removeFromCompare(item[2]))} className='btn btn-cart border-0 rounded'><MdDelete title='Remove From Compare' className='fs-3 p-1 text-danger'/></button>
                </div>
            </td>}
         </tr>
      </tbody>
 </table>
</div>
      
            </div>
            : 
            <div style={{height:"100vh"}} className='text-center pt-5'>
                <div className='d-flex justify-content-center'>
               <lottie-player src="https://assets9.lottiefiles.com/private_files/lf30_gctc76jz.json" background="transparent" speed="1" style={{ width: "20rem" }} loop autoplay></lottie-player>
               </div>
               <h2>Your Comparelist is empty- Please add some products.</h2> <br />
                <Link to={`/mobiles`}><button className="btn btn-lg btn-pink">Start shopping now</button></Link>
               </div> 
            }
           <Footer/> 
        </>
    );
};

export default Compare;