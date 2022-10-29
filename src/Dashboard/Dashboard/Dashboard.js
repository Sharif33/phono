import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import { AiFillFileAdd } from "react-icons/ai";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { MdOutlineLocalOffer,MdDashboard } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

import { Avatar, CircularProgress, Typography} from '@mui/material';

import {Outlet, Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
// import { Logout } from '@mui/icons-material';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import FeedIcon from '@mui/icons-material/Feed';
// import PersonIcon from '@mui/icons-material/Person';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './Dashboard.css';

const drawerWidth = 250;

function Dashboard(props) {

    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
                setInterval(() => {
                setTime(new Date());  
                }, 1000);
              }, []);

    const date = new Date().toDateString().slice(0,-5);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const { user, logOut, admin, isLoading } = useAuth();
    if (isLoading) { return <CircularProgress /> }
    
    const drawer = (
        <div>
            
            {
                user?.email && <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& > :not(style) + :not(style)': {
                        px: 2,
                        mb: 1,
                    },
                }}>
                    <NavLink className="navbar-brand fw-bold fs-3 text-warning" to="/home">PH<span className="text-danger">|O|</span>NO</NavLink>
                    <Toolbar/>
                    {/* <Box sx={{ display: 'block', textAlign: 'center',marginTop:'15px' }}>
                        <img className="img-fluid px-3 w-50 rounded-circle mx-auto" src={user?.photoURL} alt="" />
                        <h5 className="text-center">{user?.displayName}</h5>
                        <Button sx={{ mb: 1 }} onClick={logOut} variant="outlined" color="error"><Logout fontSize="small" /> Logout</button>
                    </Box> */}
                    <div className='d-flex align-items-center justify-content-center  px-4 mb-4 rounded bg-avatar'>
                        <Avatar src={user?.photoURL} alt="" />
                        <div className='d-block align-items-center mt-3 mx-2'>
                            <small className="fw-bold">{user?.displayName}</small>
                            <p>
                            {
                                admin ? <small>admin</small> : <small>user</small>
                            }
                            </p>
                        </div>
                   </div>
                </Box>
            }
           {!admin && <Box>
            <List>    
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#E94235' : '#ccd6f6', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? '': 'rgba(0, 171, 85, 0.08)'})} to={`/dashboard`}> <span className='me-2 fs-5'><MdDashboard /></span>  Dashboard</NavLink>
            </List>
            <List>
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/myOrders`}> <span className='me-2 fs-5'><FeedIcon /></span> Orders History</NavLink>
            </List>
            <List>
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`user`}> <span className='me-2 fs-5'><FaUserCog /></span> Manage Profile</NavLink>
            </List>
                </Box>
            }
           
            {admin &&  <Box  sx={{px:1}}>
                <h6 className='ps-4 fw-bold'>MANAGEMENT</h6>
                <List>    
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#E94235' : '#ccd6f6', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to={`/dashboard`}> <span className='me-2 fs-5'><MdDashboard /></span>  Dashboard</NavLink>
               </List>
                <List>
               <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/manageOrder`}><span className='me-2'><ShoppingCartCheckoutOutlinedIcon /></span>  Manage Orders</NavLink>
               </List>              
               <List>    
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to={`/dashboard/manageProducts`}><span className='me-2 fs-5'><AddTaskOutlinedIcon /></span> Manage Products</NavLink>
               </List>
               <List>    
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to={`/dashboard/manageOffers`}><span className='me-2 fs-5'><MdOutlineLocalOffer /></span> Manage Offers</NavLink>
               </List>
               <List>
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`manageUsers`}> <span className='me-2 fs-5'><FaUserCog /></span> Manage User</NavLink>
            </List>
               <h6 className='py-2 ps-4 fw-bold'>DEVELOPMENT</h6> 
                <List>
                <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/makeAdmin`}><span className='me-2 fs-5'><AdminPanelSettingsIcon /></span> Make Admin</NavLink>
               </List>
               <List>
               <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/addMobile`}><span className='me-2 fs-5'><AddCircleOutlineOutlinedIcon /></span> Add Mobile</NavLink>
               </List>                           
               <List>
               <NavLink className='btn btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/addOffer`}><span className='me-2 fs-5'><AiFillFileAdd /></span> Add Offer</NavLink>
               </List>                           
            </Box>
            }
           
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
        
        <Box sx={{ display: 'flex' }}>
            
        <AppBar position="fixed" 
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` },boxShadow:"none"}}>
            <Toolbar className='bg-light'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{fontSize:{md:"2em", sm:"1.5em", xs:"1.5em"}, fontFamily:"Rubik",color:"#637381"}} noWrap component="div">
                    {time.toLocaleTimeString()}      
                    </Typography>
                    <span sx={{fontSize:"0.9em"}} className="text-pink"> {date}</span>
                <Box sx={{ ml: "auto", display: 'flex' }}>
                <div className="dropdown">
                        <div style={{cursor:"pointer"}} id="navbarDropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false" className='rounded bg-nav-btn'>
                            <Avatar alt="" src={user?.photoURL} />             
                        </div>
                                                  
                    <ul className="dropdown-menu border-0 shadow" aria-labelledby="navbarDropdownMenuLink2">

                        <li className=" dropdown-item border-bottom">
                            <small className='fw-bold'>{user?.name ? user.name : user?.displayName}</small><br />
                            <small className="text-center">{user?.email}</small>
                        </li>

                        <Link className='text-dark dropdown-item' style={{textDecoration:'none',color:"white"}} to="/dashboard/user"><small>Profile</small></Link>

                        <Link  className='text-dark dropdown-item' style={{textDecoration:'none',color:"white"}} to="/"><small>Home</small></Link>
                                                  
                        <button onClick={logOut} className="btn text-danger fw-bold dropdown-item">
                        Logout </button>          
                    </ul>
                                                  
                </div>                    
                </Box>

            </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClick={handleDrawerToggle}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                
                <Toolbar />
                 <Outlet></Outlet>
            </Box>
           
        </Box>
        </>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;