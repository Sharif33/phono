import React from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import about from "../../images/about.jpg";

const DashboardHome = () => {
    const {user}=useAuth();
    return (
        <div>
            
            <div className="bg-welcome">
                <div className="text-center p-3">
                    <img className="img-fluid rounded-circle my-3 shadow" src={user?.photoURL} alt="" />
                    <h1 className="text-warning fw-bold fs-1">Hello! <span className="text-dark">{user?.displayName}</span> </h1>
                    <h3><span className="text-dark">Welcome to <span className="text-info fw-bold fs-1">phono</span></span></h3>
                </div>
            </div>
            <div>
                <img className="img-fluid" src={about} alt="" />   
            </div>
        
        </div>
    );
};

export default DashboardHome;