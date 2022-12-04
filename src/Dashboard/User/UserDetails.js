import React from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import DefaultAddress from './Addresses/DefaultAddress';

const UserDetails = () => {
    const { user, defaultAdrs } = useAuth();
    // const [orders] = useOrders();
    return (
        <>    
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
                                <input className='border-0 p-2 w-75' defaultValue={defaultAdrs?.name ? defaultAdrs?.name : user?.displayName} readOnly />
                            </li> <br />
                            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                                <span className="text-secondary">Your Email</span>
                                <input className='border-0 p-2 w-75' defaultValue={user?.email} readOnly />
                            </li> <br />
                            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                                <span className="text-secondary">Phone Number</span>
                                <input className='border-0 p-2 w-75' defaultValue={defaultAdrs?.phone ? defaultAdrs?.phone : user?.phoneNumber} readOnly />
                            </li> <br />
                            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                                <span className="text-secondary">Member Since</span>
                                <input className='border-0 p-2 w-75' defaultValue={user?.metadata?.creationTime?.slice(0, -12)} readOnly />
                            </li> <br />
                            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                                <span className="text-secondary">Last SignIn</span>
                                <input className='border-0 p-2 w-75' defaultValue={user?.metadata?.lastSignInTime?.slice(0, -12)} readOnly />
                            </li>

                        </ul> <br />

                    </div>
                </div>
            </div>
        </div>
        <div>
            <DefaultAddress />
        </div>
        </>
    );
};

export default UserDetails;