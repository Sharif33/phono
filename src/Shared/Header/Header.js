
import { Avatar, Chip,Toolbar } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";
import { useSelector } from 'react-redux';
import SearchNav from './SearchNav';
import { Drawer, Box } from '@mui/material'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { CiCircleInfo,CiGrid41,CiUser } from "react-icons/ci";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { RiShoppingBag3Fill, RiShoppingBag3Line } from 'react-icons/ri';
import NavRoutes from './NavRoutes';

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

const {addToFvrt} = useSelector((state) => state.fvrt);
const {addToCart} = useSelector((state) => state.cart);
const {addToCompare} = useSelector((state) => state.compare);

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: 3,
        backgroundColor:"#183153",
        color: "#ffffff",
      border: `2px solid ${theme.palette.background.paper}`,
    //   padding: '2px',
    },
    }));

const { user, logOut, defaultAdrs } = useAuth();
// const defaultAdrs = useUser();

const navigate = useNavigate();

return (
<>
    <Box sx={{ flexGrow: 1,marginBottom:"60px" }}>         
    <AppBar sx={{background:"rgba(255, 255, 255, 0.7)",backdropFilter: "blur(20px)",boxShadow:0,}} position="fixed">
      <Container maxWidth='xl'>     
                <Toolbar sx={{}}>
                    <IconButton onClick={() => setIsDrawerOpen(true)}
                    // sx={{ mr: 2, display: { sm: 'none' } }}
                    sx={{color:"#183153"}}
                    size='large'
                    edge='start'
                    aria-label='logo'>
                    <MenuIcon />
                    </IconButton> 
                    <Drawer
                        anchor='left'
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}>
                        <Box  width='250px' role='presentation' textAlign='right'>
                            <IconButton color="error" sx={{m:1}}  onClick={() => setIsDrawerOpen(false)}>
                                <CloseIcon color='error'/>
                          </IconButton>
                          {/* Routes */}                        
                            <NavRoutes/>   
                        </Box>
                    </Drawer>
                      
                    <Box >
                         <NavLink style={{fontFamily:'Rubik'}} className="fw-bold fs-3 text-blue" to="/home">PH<span className="text-pink">|O|</span>NO</NavLink>
                    </Box>   
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{display:{xs:'none', sm:'none', md:'flex', xl:'flex'}, my:'auto'}}>
                        <div className='nav-hidder my-auto'>
                            <SearchNav/>      
                        </div> 
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />        
                    
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <NavLink to={`/fvrt`} >
                        <IconButton aria-label="favorite">
                        <StyledBadge badgeContent={addToFvrt?.length}>
                            {addToFvrt?.length ? 
                            <MdOutlineFavorite style={{color:"#183153"}} />
                            :
                            <MdOutlineFavoriteBorder style={{color:"#183153"}} />
                            }
                        
                        </StyledBadge>
                        </IconButton>
                    </NavLink> 

                    <NavLink to={`/cart`} >          
                        <IconButton sx={{ mx: {xs:1, sm:1, md:3} }} aria-label="cart">
                        <StyledBadge badgeContent={addToCart?.length}>
                            {addToCart?.length ?
                            <RiShoppingBag3Fill style={{color:"#183153"}} />
                            :
                            <RiShoppingBag3Line style={{color:"#183153"}} />
                            }
                        </StyledBadge>
                        </IconButton>   
                    </NavLink>

                    <NavLink to={`/compare`} >
                        <IconButton aria-label="compare">
                        <StyledBadge badgeContent={addToCompare?.length} >
                        <GoLaw style={{color:"#183153"}} />
                        </StyledBadge>
                        </IconButton>
                    </NavLink>
        
            {
            user?.email ?           
            <Box sx={{position:"relative"}}>        
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: {xs:1, sm:1, md:3} }}
                edge="end"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open || undefined}
            >
                <Avatar alt={user?.displayName} src={user?.photoURL} />  
            </IconButton>                                                       
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
            <MenuItem >
            <small >{defaultAdrs?.name || user?.displayName} <br /> <span  style={{color: '#74829C', fontSize:"0.85em"}}>{user?.email}</span></small>
            </MenuItem>
            <Divider />
  
            <MenuItem style={{color: '#282f53'}} onClick={()=>{navigate(`/dashboard/user`)}}>
            <ListItemIcon>
            <CiUser/>
            </ListItemIcon>
            <small>Profile</small>
            </MenuItem>
           
            <MenuItem style={{color: '#282f53'}} onClick={()=>{navigate(`/dashboard`)}}>
            <ListItemIcon>
            <CiGrid41/>
            </ListItemIcon>
            <small>Dashboard</small>        
            </MenuItem>
        
            <MenuItem style={{color: '#282f53'}} onClick={logOut}>
            <ListItemIcon>
            <CiCircleInfo/>
            </ListItemIcon >
            <small>Logout</small>     
            </MenuItem>
            </Menu>
            </Box>
            :
            <NavLink to={`/login`} >
                <Chip 
                icon={<AccountCircleIcon size='large' style={{color: '#183153'}}/>}
                sx={{ ml: {xs:1, sm:1, md:3}, display:{xs:'none',sm:'none', md:'flex'}, py:2.5, px:2 }}
                edge="end"
                label='Account'
                variant="outlined"
                />
                <IconButton sx={{ ml: {xs:1, sm:1, md:3}, display:{xs:'flex',sm:'flex', md:'none'}, color: '#183153'}}>
                    <AccountCircleIcon sx={{color: '#183153', fontSize:30}}/>
                </IconButton>
                
            </NavLink> 
            }
    
        </Box>
        </Toolbar>                 
        </Container>
           </AppBar>
           </Box>  

            {/* <BottomHeader/> */}
    </>
);
};

export default Header;