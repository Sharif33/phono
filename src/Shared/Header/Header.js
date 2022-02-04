
import { Avatar, Link } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";

const Header = () => {

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -2,
          top: 5,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

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
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " to="/mobiles">SHOP</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT US</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " to="/about">ABOUT US</NavLink>
                                        </li>
                                        <li className="nav-item">
                                        <NavLink className='me-1' to={`/dashboard/myOrders`} >
                                        <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={orders?.length} color="secondary">
                                        <ShoppingCartIcon sx={{ color: 'primary.main'}} />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink>
                                        </li>
                                        <li className="nav-item dropdown mx-2">
                                        <Avatar id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" alt="" src={user?.photoURL} />
                                        <ul className="dropdown-menu border-0 shadow" aria-labelledby="navbarDropdownMenuLink">
                                        <li className=" dropdown-item border-bottom">
                                            <small className='fw-bold'>{user?.displayName}</small><br />
                                        <small className="text-center">{user?.email}</small>
                                        </li>
                                        <li className=" dropdown-item">
                                        <small className="text-center">Profile</small>
                                        </li>
                                        <li className=" dropdown-item ">
                                        <NavLink  className='text-dark' style={{textDecoration:'none',cursor:"pointer",color:"#38D373"}} to="/dashboard"><small>Dashboard</small></NavLink>
                                        </li>
                                        <li className="dropdown-item">
                                        <small style={{cursor:"pointer",color:"#38D373"}} onClick={logOut} >Logout</small>
                                        </li>
                                        </ul>
                                        </li>
                                    </ul>
                                        : <ul className="navbar-nav mx-auto">
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " to="/mobiles">SHOP</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT US</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1  " to="/about">ABOUT US</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : '#38D373' })} className="nav-link active mx-1" to="/login"><span> <i className="fas fa-user"> </i> SIGN IN </span> </NavLink>
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