
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
import {MdOutlineFavoriteBorder } from "react-icons/md";
import {BsCart2 } from "react-icons/bs";
import { GoLaw } from "react-icons/go";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";
// import { Favourite } from '../../Contexts/AuthProvider/FavContext';
import { useSelector } from 'react-redux';
import SearchNav from './SearchNav';
import { Drawer, Box } from '@mui/material'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import useUser from '../../Hooks/useUser/useUser';
import { CiCircleInfo,CiGrid41,CiUser } from "react-icons/ci";

const Header = () => {
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};
const handleClose = () => {
    setAnchorEl(null);
};

// const {cart} = useContext(Favourite);
const {addToFvrt} = useSelector((state) => state.fvrt);
const {addToCart} = useSelector((state) => state.cart);
const {addToCompare} = useSelector((state) => state.compare);

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: 3,
        backgroundColor:"#05C3FB",
        color: "#ffffff",
    //   border: `2px solid ${theme.palette.background.paper}`,
    //   padding: '2px',
    },
    }));

const { user, logOut } = useAuth();
const [users] = useUser();
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
//     setCategories(matchedMobiles); style={{ backgroundColor: "#303f9f" }}
// }

return (
<div>
    <div style={{marginBottom:"60px"}} className="header">
        <div className="header-inner">
            <nav className=" py-2 fixed-top ms-auto bg-light">
                <div className="container">      
                <div className="d-flex justify-content-between">
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
                                    
                                    <NavLink className='btn btn-hover w-100 mb-2 text-start' style={{textDecoration:"none", }} to="/search">
                                        <input style={{width:"50vw", border: "1px solid #e9edf4", borderRadius: "7px"}}
                                        className='mx-1 p-2'
                                        type="search"
                                        placeholder="Search"
                                        />
                                        <span className="searchIcon">
                                        <SearchIcon  style={{color:"#0d6efd"}}/> </span>
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
                    <div className='nav-hidder my-auto'>
                            <SearchNav/>      
                    </div>
                    
        <div className='my-auto'>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <div>
                    <NavLink to={`/fvrt`} >
                    <IconButton aria-label="favorite">
                    <StyledBadge badgeContent={addToFvrt?.length}>
                    <MdOutlineFavoriteBorder style={{color:"#0d6efd"}} />
                    </StyledBadge>
                    </IconButton>
                    </NavLink> 
                    </div>

                    <div className='mx-2'>
                    <NavLink to={`/cart`} >          
                    <IconButton aria-label="cart">
                    <StyledBadge badgeContent={addToCart?.length}>
                    <BsCart2 style={{color:"#0d6efd"}} />
                    </StyledBadge>
                    </IconButton>   
                    </NavLink>
                    </div>

                    <div>
                    <NavLink to={`/compare`} >
                        <IconButton aria-label="compare">
                        <StyledBadge badgeContent={addToCompare?.length} >
                        <GoLaw style={{color:"#0d6efd"}} />
                        </StyledBadge>
                        </IconButton>
                    </NavLink>
                    </div>
        <div className=''>
            {
            user?.email ? 
                        
            <div style={{position:"relative"}}>
            <div>
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open || undefined}
            >
            <Avatar alt="" src={user?.photoURL} />  
            </IconButton>
                                            
            </div>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.2,
            '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
            },
            '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
            },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <MenuItem>
            <small >{users[0]?.name ? users[0].name : user?.displayName} <br /> <span  style={{color: '#74829C', fontSize:"0.85em"}}>{user?.email}</span></small>
            </MenuItem>
            <Divider />

            <NavLink style={{color: '#282f53'}} to="/dashboard/user">
            <MenuItem>
            <ListItemIcon>
            <CiUser/>
            </ListItemIcon>
            <small>Profile</small>
            </MenuItem>
            </NavLink>

            <NavLink style={{color: '#282f53'}} to="/dashboard">
            <MenuItem>
            <ListItemIcon>
            <CiGrid41/>
            </ListItemIcon>
            <small>Dashboard</small>
            </MenuItem>
            </NavLink>

            <MenuItem onClick={logOut}>
            <ListItemIcon>
            <CiCircleInfo/>
            </ListItemIcon>
            <small  style={{color: '#282f53'}}>Logout</small>
            </MenuItem>
            </Menu>
            </div>
:
            <NavLink className='' to={`/login`} >
            <div  style={{border:"1px solid #0d6efd"}} className='d-flex justify-content-evenly align-items-center rounded ms-2'>
            <div>

            <button className='btn'>
            <AccountCircleIcon  style={{color: '#0d6efd'}}/>
            </button>
            </div>
            <div className='nav-hidder'>
            <small  style={{color: '#0d6efd'}} className='my-auto pe-3'>Account</small>
            </div>
            </div> 
            </NavLink> 
            }
        </div>

        </Box>
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