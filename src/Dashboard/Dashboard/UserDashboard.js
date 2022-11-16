import React from 'react';
import { AiFillProject } from "react-icons/ai";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useOrders from '../../Hooks/useOrders/useOrders';
import DefaultAddress from '../User/Addresses/DefaultAddress';

const UserDashboard = () => {
    const [orders] = useOrders();
    // const lastOrder = orders.slice(-1).pop();
    const { addToCart } = useSelector((state) => state.cart);
    const { addToFvrt } = useSelector((state) => state.fvrt);
    return (
        <div>
            <div className='row row-cols-1 row-cols-md-3 m-2 g-4'>
                <div className="col">
                    <Link style={{ textDecoration: "none" }} to={`/dashboard/myOrders`}>
                        <div className="d-md-flex justify-content-center align-items-center rounded bg-cart">
                            <div className='m-auto'>
                                <AiFillProject style={{ fontSize: "15vw" }} className=' text-sky w-100' />
                            </div>
                            <div className='text-center w-100'>
                                <h3 className='fw-bold'><span className="text-danger"> {orders?.length}</span> Product(s)</h3>
                                <small>you orderd</small>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col">
                    <Link style={{ textDecoration: "none" }} to={`/cart`}>
                        <div className="d-md-flex justify-content-center align-items-center rounded bg-cart">
                            <div className='m-auto'>
                                <MdOutlineShoppingCart style={{ fontSize: "15vw" }} className='p-2 text-sky w-100' />
                            </div>
                            <div className='text-center w-100'>
                                <h3 className='fw-bold'><span className="text-danger">{addToCart?.length}</span> Product(s)</h3>
                                <small className=''>in your cart</small>
                            </div>
                        </div>
                    </Link>

                </div>
                <div className="col">
                    <Link style={{ textDecoration: "none" }} to={`/fvrt`}>
                        <div className="d-md-flex justify-content-center align-items-center rounded bg-cart">
                            <div className='m-auto'>
                                <MdFavoriteBorder style={{ fontSize: "15vw" }} className='p-2 text-sky w-100' />
                            </div>
                            <div className='text-center w-100'>
                                <h3 className='fw-bold'><span className="text-danger">{addToFvrt?.length}</span> Product(s)</h3>
                                <small className=''>in your wishlist</small>

                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='mt-5'>
                <DefaultAddress />
            </div>
            
        </div>
    );
};

export default UserDashboard;