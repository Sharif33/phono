import { MdOutlineLocalOffer, MdDashboard} from "react-icons/md";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { FaUserCog } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Box } from "@mui/system";
import { List, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';

const DashboardRoutes = () => {
    const {admin } = useAuth();
    const managementRoute = [
        {
            rName:"Manage Orders",
            icon: <ShoppingCartCheckoutOutlinedIcon/>,
            to:"/dashboard/manageOrder"
        },
        {
            rName:"Manage Products",
            icon: <AddTaskOutlinedIcon/>,
            to:"/dashboard/manageProducts"
        },
        {
            rName:"Manage Offers",
            icon: <MdOutlineLocalOffer/>,
            to:"/dashboard/manageOffers"
        },
        {
            rName:"Manage Users",
            icon: <FaUserCog/>,
            to:"/dashboard/manageUsers"
        },
    ];

    const developmentRoute = [
        {
            rName:"Admin Panel",
            icon: <AdminPanelSettingsIcon />,
            to:"/dashboard/makeAdmin"
        },
        {
            rName:"Add Products",
            icon: <AddCircleOutlineOutlinedIcon />,
            to:"/dashboard/addMobile"
        },
        {
            rName:"Add Offer",
            icon: <AiFillFileAdd />,
            to:"/dashboard/addOffer"
        }
    ]
    return (
        <>
        <List> 
            <ListItem disablePadding>   
                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#E94235' : '#ccd6f6', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? '': 'rgba(0, 171, 85, 0.08)'})} to={`/dashboard`}> <span className='mx-3 fs-5'><MdDashboard /></span>  Dashboard</NavLink>
            </ListItem>
        </List>
        {!admin && <Box>
            <List>
                <ListItem disablePadding>
                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/myOrders`}> <span className='mx-3 fs-5'><FeedIcon /></span> Orders History</NavLink>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`user`}> <span className='mx-3 fs-5'><FaUserCog /></span> Manage Profile</NavLink>
                </ListItem>
            </List>
                </Box>
            }
           
            {admin &&  <Box>
               
               <List>
              
                 <h6 className='ps-4 fw-bold'>MANAGEMENT</h6>
                {
                    managementRoute?.map(route=>( 
                        <ListItem key={route.rName} disablePadding>
                        <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`${route.to}`}><span className='mx-3 fs-5'>{route.icon}</span>{route.rName}</NavLink>
                        </ListItem>        
                    ))
                } 
                  </List>
            
                   <List>
                    <h6 className='py-2 ps-4 fw-bold'>DEVELOPMENT</h6> 
                {
                    developmentRoute?.map(route=>( 
                        <ListItem key={route.rName} disablePadding>
                        <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`${route.to}`}><span className='mx-3 fs-5'>{route.icon}</span>{route.rName}</NavLink> 
                        </ListItem>      
                    ))
                } 
                  </List>                     
            </Box>
            } 
        </>
    );
};

export default DashboardRoutes;