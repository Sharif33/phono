
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";

const Header = () => {
    const { user, logOut } = useAuth();
  const [orders, setOrders] = useState([]);
  const email = user?.email;
  useEffect(() => {
      fetch(`https://peaceful-shore-84874.herokuapp.com/myOrders/${email}`)
          .then((res) => res.json())
          .then((data) => setOrders(data));
  }, [email]);

//   const handleSearch = e =>{
//     const searchText = e.target.value;
//     const matchedMobiles = mobiles.filter(mobile=>mobile.name.toLowerCase().includes(searchText.toLowerCase()));
//     setCategories(matchedMobiles);
// }

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
                                    user?.email ? <ul className="navbar-nav text-center mx-auto">
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/mobiles">SHOP</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT US</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/about">ABOUT US</NavLink>
                                        </li>
                                        <li className="nav-item">
                                        <NavLink to={`/dashboard/myOrders`} >
                                        <i className="fas text-danger fa-cart-arrow-down nav-link active mx-1 position-relative"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                        {orders?.length}
                                        <span className="visually-hidden">unread messages</span>
                                        </span></i>
                                        </NavLink>
                                        </li>
                                        <li className="nav-item dropdown mx-2">
                                        <Avatar id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" alt="" src={user?.photoURL} />
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li className=" dropdown-item">
                                            <NavLink className="text-decoration-none" to="/dashboard">{user?.displayName}</NavLink>
                                        </li>
                                        <li className=" dropdown-item">
                                            <NavLink className="text-decoration-none" to="/dashboard">DASHBOARD </NavLink>
                                        </li>

                                        <li className="dropdown-item">
                                            <button onClick={logOut} className='btn btn-custom-3'>Logout</button>
                                        </li>
                                        </ul>
                                        </li>
                                    </ul>
                                        : <ul className="navbar-nav mx-auto">
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/mobiles">SHOP</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT US</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1  " to="/about">ABOUT US</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#764ABC' })} className="nav-link active mx-1" to="/login">SIGN IN <span><i className="fas fa-user"></i></span> </NavLink>
                                            </li>
                                        </ul>
                                }
                                {/* <form class="d-flex">
        <input onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
                                */}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;