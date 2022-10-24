import React,{useEffect} from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import useOrders from '../../Hooks/useOrders/useOrders';
import useUser from '../../Hooks/useUser/useUser';
import EditUser from '../User/EditUser'

const UserDetails = () => {
    const{user} = useAuth();
    const [orders] = useOrders();
    const [users]= useUser();
    const [openUserNow, setOpenUserNow] = React.useState(false);
    const handleOpen = () => setOpenUserNow(true);
    const handleClose = () => setOpenUserNow(false);

    useEffect(()=>{
        users?.map(usr =>{
            return usr;
        })
    },[users]);
    
    return (
        <div>
        {
        users?.map(usrD=>(
            <div key={usrD._id}>
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
                <input className='border-0 p-2 w-75' defaultValue={usrD?.name ? usrD?.name : user?.displayName} readOnly />
            </li> <br />
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Your Email</span>
                 <input className='border-0 p-2 w-75' defaultValue={user?.email} readOnly />
            </li> <br />
            <li className="list-group-item d-flex justify-content-between align-items-center pe-0 py-0 bg-transparent border-0">
                <span className="text-secondary">Phone Number</span>
                 <input className='border-0 p-2 w-75' defaultValue={usrD?.phone ? usrD?.phone : user?.phoneNumber} readOnly />
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
                        <button onClick={handleOpen} className="btn btn-purple">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row m-2 g-4">
                   <h5 className='text-center'>Shipping Address</h5>
                    <div className='col-md-6 rounded p-2'>
                        <div className='text-start bg-cart w-100 p-3'>
                            <h6>{usrD?.name ? usrD?.name : user?.displayName}</h6>
                            <h6>{usrD?.address ? usrD?.address : orders[0]?.address}</h6>
                            <h6>{usrD?.city ? usrD?.city : orders[0]?.city}</h6>
                            <h6>{usrD?.country ? usrD?.country : orders[0]?.country}</h6>
                            <h6>{usrD?.phone ? usrD?.phone : orders[0]?.phone}</h6>
                        </div>
                    </div>
                    <div className="col-md-6 rounded p-2">
                        <div onClick={handleOpen} className="w-100 bg-cart text-center p-2">
                            <h1> + </h1>
                            <p>Add/Edit Address</p>
                        </div>
                    </div> 
                </div>   
                    </div>
                ))
            }
            <div>
               <EditUser
               openUserNow={openUserNow}
               handleClose={handleClose}
               ></EditUser> 
            </div>    
    </div>
    );
};

export default UserDetails;