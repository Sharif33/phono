import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Avatar, CircularProgress} from '@mui/material';

import {Outlet, Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
// import { Logout } from '@mui/icons-material';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './Dashboard.css';

const drawerWidth = 250;

function Dashboard(props) {
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
                <NavLink className='btn btn-hover' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/myOrders`}>My Orders</NavLink>
                </List>
                </Box>
            }
           
            {admin &&  <Box  sx={{p:1}}>
                <h6 className='ps-4 fw-bold'>MANAGEMENT</h6>
                <List>    
                <NavLink className='btn btn-hover' style={({isActive})=> ({color: isActive ? '#E94235' : '#ccd6f6', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to={`/dashboard`}> <span className='me-2'><HomeIcon /></span>  Overview</NavLink>
               </List>
                <List>
               <NavLink className='btn btn-hover' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/manageOrder`}><ShoppingCartCheckoutOutlinedIcon /> Manage Orders</NavLink>
               </List>              
               <List>    
                <NavLink className='btn btn-hover' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to={`/dashboard/manageProducts`}><AddTaskOutlinedIcon /> Manage Products</NavLink>
               </List> 
                <List>
                <NavLink className='btn btn-hover' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/makeAdmin`}><AdminPanelSettingsIcon /> Make Admin</NavLink>
               </List>
               <List>
               <NavLink className='btn btn-hover' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/addMobile`}><AddCircleOutlineOutlinedIcon />Add Mobile</NavLink>
               </List>                           
            </Box>
            }
           
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
        
        <Box sx={{ display: 'flex', backgroundColor:"#EEF2FF" }}>
            
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className='bg-dash bg-light'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard       
                    </Typography>
                <Box sx={{ ml: "auto", display: 'flex' }}>
                    <div className="dropdown mx-2">
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
                                        <Link className='text-dark' style={{textDecoration:'none'}} to="/home"><small>Home</small></Link>
                                        </li>
                                        <li className="dropdown-item">
                                        <small style={{cursor:"pointer",color:"#38D373"}} onClick={logOut} >Logout</small>
                                        </li>
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