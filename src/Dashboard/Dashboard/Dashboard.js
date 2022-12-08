import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, CircularProgress, CssBaseline,List,ListItem,ListItemAvatar,ListItemText,Typography} from '@mui/material';
import {Outlet, Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import './Dashboard.css';
import DashboardRoutes from './DashboardRoutes';


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
    
    const { user, logOut, admin, isLoading, defaultAdrs } = useAuth();
    if (isLoading) { return <CircularProgress /> }
    
    const drawer = (
        <>  
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
                    <NavLink style={{fontFamily:'Rubik'}} className="fw-bold fs-3 text-blue" to="/home">PH<span className="text-pink">|O|</span>NO</NavLink>
                    
                    <Toolbar/>
                   
                    <div className='px-3 mb-4 rounded bg-avatar'> 
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar src={user?.photoURL} alt={user?.displayName} />
                            </ListItemAvatar>
                            <ListItemText
                            primary={
                                <>
                                <Typography variant='body2'>
                                    { defaultAdrs?.name || user?.displayName}
                                </Typography>
                                </>     
                            }
                            secondary={ admin ? "admin" : "member" }
                            />
                        </ListItem>
                    </List>
                   </div>
                </Box>
            }
            {/* Routes */}
            <DashboardRoutes/>  
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>     
        <Box sx={{ display: {md:'flex'} }}>
        <CssBaseline />  
        <AppBar position="fixed" 
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` },boxShadow:"none",background:"rgba(255, 255, 255, 0.7)",backdropFilter: "blur(20px)",}}>
            <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{color:"#637381"}} />
                    </IconButton>
                    <Box>
                         <Typography sx={{fontSize:{md:"1.3em", sm:"1.1em", xs:"1.1em"}, fontFamily:"Rubik",color:"#637381"}} noWrap component="div">
                        {time.toLocaleTimeString()}      
                    </Typography>
                        <span sx={{fontSize:"0.5em"}} className="text-pink"> {date}</span>
                    </Box>
                   
                <Box sx={{ ml: "auto", display: 'flex' }}>
                <div className="dropdown">
                        <div style={{cursor:"pointer"}} id="navbarDropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false" className='rounded bg-nav-btn'>
                            <Avatar alt="" src={user?.photoURL} />             
                        </div>
                                                  
                    <ul className="dropdown-menu border-0 shadow" aria-labelledby="navbarDropdownMenuLink2">

                        <li className=" dropdown-item border-bottom">
                            <small className='fw-bold'>{defaultAdrs?.name || user?.displayName}</small><br />
                            <small className="text-center">{user?.email}</small>
                        </li>

                        <Link className='text-dark dropdown-item' style={{textDecoration:'none',color:"white"}} to="/dashboard/user"><small>Profile</small></Link>

                        <Link  className='text-dark dropdown-item' style={{textDecoration:'none',color:"white"}} to="/"><small>Home</small></Link>
                                                  
                        <button onClick={logOut} className="text-danger fw-bold dropdown-item">
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
                 <Outlet/>
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