
import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MailIcon from '@mui/icons-material/Mail';
import {MdShoppingCart, MdFavorite, MdCompareArrows } from "react-icons/md";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";
// import { Favourite } from '../../Contexts/AuthProvider/FavContext';
import { useSelector } from 'react-redux';
import SearchNav from './SearchNav';
import { Drawer, Box } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // const {cart} = useContext(Favourite);
    const {addToFvrt} = useSelector((state) => state.fvrt);
    const {addToCart} = useSelector((state) => state.cart);
    const {addToCompare} = useSelector((state) => state.compare);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -5,
          top: 3,
        //   border: `2px solid ${theme.palette.background.paper}`,
        //   padding: '0 2px',
        },
      }));

    const { user, logOut } = useAuth();
 /*  const [orders, setOrders] = useState([]);
  const email = user?.email;
  useEffect(() => {
      fetch(`https://peaceful-shore-84874.herokuapp.com/myOrders/${email}`)
          .then((res) => res.json())
          .then((data) => setOrders(data));
  }, [email]); */

//   const handleSearch = e =>{
//     const searchText = e.target.value;
//     const matchedMobiles = mobiles.filter(mobile=>mobile.name.toLowerCase().includes(searchText.toLowerCase()));
//     setCategories(matchedMobiles);
// }

    return (
    <div>
        <div style={{marginBottom:"60px"}} className="header">
            <div className="header-inner">
                <nav style={{ backgroundColor: "#303f9f" }} className=" py-2 fixed-top ms-auto">
                 <div className="container-fluid">
                            
                    <div className="d-flex justify-content-evenly">
                        <div>
                            <div className='d-flex  justify-content-evenly'>
                            <div className='m-auto'>
                                <div>
                                    <IconButton onClick={() => setIsDrawerOpen(true)}
                                    // sx={{ mr: 2, display: { sm: 'none' } }}
                                    sx={{color:"#D7E1F7"}}
                                    size='large'
                                    edge='start'
                                    aria-label='logo'>
                                    <MenuIcon />
                                    </IconButton>  
                                </div>
                                <div>
                                <Drawer
                                    anchor='left'
                                    open={isDrawerOpen}
                                    onClose={() => setIsDrawerOpen(false)}>
                                    <Box  width='250px' role='presentation' textAlign='center'>
                                        <div className="p-2 text-end">
                                            <button className='btn text-danger' onClick={() => setIsDrawerOpen(false)}><CloseIcon/></button>
                                        </div>
                                    <ul className="navbar-nav">
                                        <li className="nav-item small-search">
                                            <NavLink className='btn btn-hover w-100 mb-2' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to={`/compare`} >
                                            <IconButton aria-label="compare">
                                            <StyledBadge badgeContent={addToCompare?.length} color="error">
                                            <MdCompareArrows className='text-dark' />
                                            </StyledBadge>
                                            </IconButton>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='btn btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to="/"><HomeIcon className='mx-3'/> Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='btn btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to="/mobiles"><ShoppingBagIcon className='mx-3'/> Shop</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='btn btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} href="#contact" to="/contact"><MailIcon className='mx-3'/> Contact</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='btn btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to="/about"><GroupsIcon className='mx-3'/> About</NavLink>
                                        </li>
                                     </ul>
                                    </Box>
                                </Drawer>  
                               </div>
                            </div>

                                <div className='m-auto'>
                                    <NavLink className="navbar-brand fw-bold fs-3 text-warning" to="/home">PH<span className="text-danger">|O|</span>NO</NavLink>
                                </div>   
                         </div>
                        </div>
                        
                                <div className='my-auto'>
                                   <div className='d-flex  justify-content-between'>
                                    <div className='nav-hidder my-auto'>
                                          <SearchNav/>      
                                    </div>
                                    <div className='small-search m-auto'>
                                         <NavLink className='mx-1 btn' style={{textDecoration:"none"}} to="/search"><span><SearchIcon className='text-light'/></span></NavLink>
                                    </div>
                                      
                                        <div className='d-flex justify-content-center  align-items-center my-auto'>

                                        <div>
                                        <NavLink className='mx-2' to={`/fvrt`} >
                                        <IconButton aria-label="favorite">
                                        <StyledBadge badgeContent={addToFvrt?.length} color="error">
                                        <MdFavorite className='text-light' />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink> 
                                        </div>

                                        <div>
                                        <NavLink className='mx-1' to={`/cart`} >
                                        
                                        <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={addToCart?.length} color="error">
                                        <MdShoppingCart className='text-light' />
                                        </StyledBadge>
                                        </IconButton>   
                                        </NavLink>
                                        </div>

                                        <div className='nav-hidder'>
                                        <NavLink className='mx-2' to={`/compare`} >
                                            <IconButton aria-label="compare">
                                            <StyledBadge badgeContent={addToCompare?.length} color="error">
                                            <MdCompareArrows className='text-light' />
                                            </StyledBadge>
                                            </IconButton>
                                        </NavLink>
                                        </div>
                                 <div className=''>
                                {
                                     user?.email ? 
                                           
                                        <div className="dropdown">
                                            <div style={{cursor:"pointer"}} id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className='d-flex justify-content-evenly align-items-center rounded ms-2 bg-nav-btn'>
                                                <div>
                                                    <Avatar alt="" src={user?.photoURL} />
                                                </div>
                                                <div className='nav-hidder'>
                                                      <small className='px-2 text-light my-auto'>{user?.name ? user.name : user?.displayName}</small>
                                                  </div>
                                                 </div>
                                                  
                                                  <ul className="dropdown-menu border-0 shadow" aria-labelledby="navbarDropdownMenuLink">
                                                  <li className=" dropdown-item border-bottom">
                                                      <small className='fw-bold'>{user?.displayName}</small><br />
                                                  <small className="text-center">{user?.email}</small>
                                                  </li>
          
                                                  
                                                  <NavLink className='text-dark dropdown-item' style={{textDecoration:'none',color:"white"}} to="/dashboard/user"><small>Profile</small></NavLink>

                                                  <NavLink  className='text-dark dropdown-item' style={{textDecoration:'none',color:"white"}} to="/dashboard"><small>Dashboard</small></NavLink>
                                                  
                                                <button onClick={logOut} className="btn fw-bold dropdown-item text-danger"> Logout </button>
                                                </ul>
                                                </div>
                                                    :
                                                <NavLink className='' to={`/login`} >
                                                <div className='d-flex justify-content-evenly align-items-center rounded ms-2 bg-nav-btn'>
                                                <div>
                                                    
                                                <button className='btn'>
                                                <AccountCircleIcon className='text-light'/>
                                                </button>
                                                </div>
                                                <div className='nav-hidder'>
                                                    <small className='my-auto text-light pe-3'>Account</small>
                                                </div>
                                              </div> 
                                              </NavLink> 
                                        }
                            </div>
                                        </div>
                                        
                                        
                                        

                                        
                                        

                                        {/* <NavLink className='me-1' to={`/mobiles`} >
                                        <i className="fa-solid mx-3 fs-5 fa-magnifying-glass"></i>
                                        </NavLink> */}
                                        {/* <NavLink className='me-1' to={`/dashboard/myOrders`} >
                                        <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={orders?.length} color="secondary">
                                        <ShoppingBagOutlinedIcon sx={{ color: 'primary.main'}} />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink> */}
                                </div> 
                                </div>
                                
                            </div>
                            
                                        
                                
                        </div>
                    </nav>
                   
                </div>
                
            </div>
             {/* <BottomHeader/> */}
        </div>
    );
};

export default Header;