import React from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import useOrders from '../../Hooks/useOrders/useOrders';

const UserDetails = () => {
    const{user} = useAuth();
    const [orders] = useOrders();
    console.log(user);
    return (
        <div>
            <div className='row m-md-2 g-4'>
            <div className="col-sm-12 col-md-12">                     
            <div className="rounded p-2">
                        <div className='p-2'>
                            <h5> Basic Info</h5>
                        </div>
            <div className='text-start w-100'>
            <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Your Name</span>
                <input className='border-0 p-2 w-75' defaultValue={user?.displayName} readOnly />
            </li> <br />
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Your Email</span>
                 <input className='border-0 p-2 w-75' defaultValue={user?.email} readOnly />
            </li> <br />
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Phone Number</span>
                 <input className='border-0 p-2 w-75' defaultValue={user?.phoneNumber} readOnly />
            </li> <br />
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Member Since</span>
                <input className='border-0 p-2 w-75' defaultValue={user?.metadata?.creationTime?.slice(0,-12)} readOnly />
            </li> <br />
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Last SignIn</span>
                <input className='border-0 p-2 w-75' defaultValue={user?.metadata?.lastSignInTime?.slice(0,-12)} readOnly />
            </li>

            </ul> <br />
                        <button className="btn btn-custom">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row m-2 g-4">
                   <h5 className='text-center'>Shipping Address</h5>
                    <div className='col-md-6 rounded p-2'>
                        <div className='text-start bg-cart w-100 p-3'>
                            <h6>{orders[0]?.address}</h6>
                            <h6>{orders[0]?.city}</h6>
                            <h6>{orders[0]?.phone}</h6>
                        </div>
                    </div>
                    <div className="col-md-6 rounded p-2">
                        <div className="w-100 bg-cart text-center p-2">
                            <h1>+</h1>
                            <p>Add New Address</p>
                        </div>
                    </div>
                    
                </div>
    </div>
    );
};

export default UserDetails;