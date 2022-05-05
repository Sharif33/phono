import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../Shared/Header/Header';
import { removeFromCompare } from '../../../Redux/slices/compareSlice';

const Compare = () => {
    const dispatch = useDispatch();
    const {addToCompare} = useSelector((state) => state.compare);
    return (
        <div>
            <Header/>
            <div className='container'>
                <div className="row pt-5">
                    <div className="col-md-2 g-0">
                        <ul>
                            <li className='border p-3'>Image</li>
                            <li className='border p-3'>Name</li>
                            <li className='border p-3'>Brand</li>
                            <li className='border p-3'>Price</li>
                            <li className='border p-3'>Rating</li>
                            <li className='border p-3'>Reviews</li>
                            <li className='border p-3'>Processor</li>
                            <li className='border p-3'>Memory</li>
                            <li className='border p-4'>Display</li>
                            <li className='border p-4'>Battery</li>
                            <li className='border p-3'>Camera</li>
                            <li className='border p-3'>Front Camera</li>
                            <li className='border p-3'>Network</li>
                            <li className='border p-3'>Action</li>
                        </ul>
                    </div>
                    <div className="col-md-10 g-0">
                        <div className="row row-cols-md-2 g-0">
                            {
                                addToCompare?.map((item)=>(
                                    <div key={item?._id} className="col d-flex">
                                        <ul>
                                            <li className='border p-1'>
                                            <Link title='See Details' to={`/mobile/${item?._id}`}> <img style={{width:"3rem"}} className='img-fluid' src={item?.image} alt="" />
                                            </Link>
                                            </li>
                                            <li className='border p-3'>{item?.name}</li>
                                            <li className='border p-3'>{item?.brand}</li>
                                            <li className='border p-3'>{item?.price}</li>
                                            <li className='border p-3'>{item?.star}</li>
                                            <li className='border p-3'>{item?.rating}</li>
                                            <li className='border p-3'>{item?.processor}</li>
                                            <li className='border p-3'>{item?.memory}</li>
                                            <li className='border p-3'>{item?.display}</li>
                                            <li className='border p-3'>{item?.battery}</li>
                                            <li className='border p-3'>{item?.camera}</li>
                                            <li className='border p-3'>{item?.selfie}</li>
                                            <li className='border p-3'>{item?.network}</li>
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
                
            </div>
        </div>
    );
};

export default Compare;