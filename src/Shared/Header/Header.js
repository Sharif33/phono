
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";

const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <div>
            <div className="header">
                <div className="header-inner">
                    <nav className="navbar navbar-expand-lg navbar-dark ms-auto">
                        <div className="container">
                            <NavLink className="navbar-brand fw-bold fs-3 text-warning" to="/home">PH<span className="text-danger">|O|</span>NO</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                {
                                    user?.email ? <ul className="navbar-nav mx-auto">
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/mobiles">SHOP</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT ME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/about">ABOUT ME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/dashboard">DASHBOARD</NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <p onClick={logOut} className='nav-link active mx-1 text-warning'>LOGOUT</p>
                                        </li>

                                    </ul>
                                        : <ul className="navbar-nav mx-auto">
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/mobiles">SMARTPHONES</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT ME</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/about">ABOUT ME</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1" to="/login">SIGN IN <span><i className="fas fa-user"></i></span> </NavLink>
                                            </li>
                                        </ul>
                                }
                                <div className="text-center">
                                    <img className="img-fluid w-25 rounded-circle px-1" src={user?.photoURL} alt="" />
                                    <p className="text-light">{user?.displayName}</p>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;