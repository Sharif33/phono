import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../Shared/Header/Header';
import { removeFromCompare } from '../../../Redux/slices/compareSlice';
import {Helmet} from "react-helmet";

const Compare = () => {
    const dispatch = useDispatch();
    const {addToCompare} = useSelector((state) => state.compare);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Compare</title>
                <link rel="canonical" href="/compare" />
            </Helmet>
            <Header/>
            <div className='container py-5'>
                        <div className="row row-cols-md-2 row-cols-2">
                            {
                                addToCompare?.map((item)=>(
                                    <div key={item?._id} className="col">
                                        <ul>
                                            
                                            <li className='border p-1'>
                                            {
                                            item?.os ? <Link title='See Details' to={`/mobile/${item?._id}`}> <img style={{width:"5rem"}} className='img-fluid' src={item?.image} alt="" />
                                            </Link> :
                                            <Link title='See Details' to={`/mobile2/${item?._id}`}> <img style={{width:"5rem"}} className='img-fluid' src={item?.image} alt="" />
                                            </Link>
                                            }
                                            </li>
                                            <li className='border p-3'>{item?.name}</li>
                                            <li className='border p-3'>{item?.brand}</li>
                                            <li className='border p-3'>{item?.price}&#x9F3;</li>
                                            <li className='border p-3'>{item?.star}</li>
                                            <li className='border p-3'>{item?.rating}</li>
                                            <li className='border p-3'>{item?.processor ? item.processor : item?.os}</li>
                                            <li className='border p-3'>{item?.memory ? item.memory : item?.storage} , {!item?.memory && item?.ram  }</li>
                                            <li className='border p-3'> {!item?.display && item?.display_size} | {item?.display ? item.display : item?.display_resolution}</li>
                                            <li className='border p-3'>{item?.battery ? item.battery : item?.battery_size} {!item?.battery && item?.battery_type}</li>
                                            <li className='border p-3'>{item?.camera ? item.camera : item?.camera_pixels}</li>
                                            <li className='border p-3'>{item?.selfie ? item.selfie : item?.specifications?.single}</li>
                                            <li className='border p-3'>{item?.network ? item.network : item?.specifications?.speed}</li>
                                            <li className='border p-3'>
                                                <button onClick={()=>dispatch((removeFromCompare(item)))} className="btn btn-danger border-0 rounded-0">Remove</button>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>        
            </div>
        </div>
    );
};

export default Compare;