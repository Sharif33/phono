import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Button, CircularProgress } from '@mui/material';

import {Outlet, Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import { Logout } from '@mui/icons-material';
// import DashboardHome from './DashboardHome';

const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const { user, logOut, admin, isLoading } = useAuth();
    if (isLoading) { return <CircularProgress /> }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                    <Box sx={{ display: 'block', textAlign: 'center',marginTop:'15px' }}>
                        <img className="img-fluid px-3 w-50 rounded-circle mx-auto" src={user?.photoURL} alt="" />
                        <h5 className="text-center">{user?.displayName}</h5>
                        <Button sx={{ mb: 1 }} onClick={logOut} variant="outlined" color="error"><Logout fontSize="small" /> Logout</Button>
                    </Box>
                </Box>
            }

           {!admin &&  <Box>
                <List>
                    <Link to={`/dashboard/myOrders`}><Button color="inherit">My Orders</Button></Link>
                </List>
                {/* <List>
                    <Link to={`/dashboard/pay/:id`}><Button color="inherit">Payment</Button></Link>
                </List> */}
                <List>
                    <Link to={`/dashboard/review`}><Button color="inherit">Reviews</Button></Link>
                </List>
                </Box>}
           
            {admin &&  <Box sx={{textDecoration:'none'}}>
                <List>
               <Link to={`/dashboard/makeAdmin`}><Button color="inherit">Make Admin</Button></Link>
               </List>
               <List>
                <Link to={`/dashboard/addMobile`}><Button color="inherit">Add Mobile</Button></Link>
               </List>              
               <List>
                <Link to={`/dashboard/manageOrder`}><Button color="inherit">Manage Orders</Button></Link>
               </List>              
               <List>
                <Link to={`/dashboard/manageProducts`}><Button color="inherit">Manage Products</Button></Link>
               </List>              
            </Box>
            }

<List> <Link to="/home"><Button color="inherit">Home</Button></Link></List>
           
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
        
        <Box sx={{ display: 'flex', backgroundColor:'#f8fafc' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar  sx={{background:"linear-gradient(45deg, #303f9f,#7b1fa2)"}} >
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
                {/* <div>
                <DashboardHome/>
            </div> */}
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