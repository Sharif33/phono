import { MdOutlineLocalOffer, MdDashboard} from "react-icons/md";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { FaUserCog } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import { NavLink } from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';

const DashboardRoutes = () => {
    const {admin } = useAuth();
    const managementRoute = [
        {
            rName:"ManageOrders",
            icon: <ShoppingCartCheckoutOutlinedIcon/>,
            to:"/dashboard/manageOrder"
        },
        {
            rName:"ManageProducts",
            icon: <AddTaskOutlinedIcon/>,
            to:"/dashboard/manageProducts"
        },
        {
            rName:"ManageOffers",
            icon: <MdOutlineLocalOffer/>,
            to:"/dashboard/manageOffers"
        },
        {
            rName:"ManageUsers",
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
        {!admin && <Box>
            <List>    
                <NavLink className='btn rounded-0 mt-1 btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#E94235' : '#ccd6f6', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? '': 'rgba(0, 171, 85, 0.08)'})} to={`/dashboard`}> <span className='me-2 fs-5'><MdDashboard /></span>  Dashboard</NavLink>
            </List>
            <List>
                <NavLink className='btn rounded-0 my-1 btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`/dashboard/myOrders`}> <span className='me-2 fs-5'><FeedIcon /></span> Orders History</NavLink>
            </List>
            <List>
                <NavLink className='btn rounded-0 my-1 btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`user`}> <span className='me-2 fs-5'><FaUserCog /></span> Manage Profile</NavLink>
            </List>
                </Box>
            }
           
            {admin &&  <Box>
               
               <List>
                 <h6 className='ps-4 fw-bold'>MANAGEMENT</h6>
                <NavLink className='btn rounded-0 my-1 btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#E94235' : '#ccd6f6', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? '': 'rgba(0, 171, 85, 0.08)'})} to={`/dashboard`}> <span className='me-2 fs-5'><MdDashboard /></span>  Dashboard</NavLink>
                {
                    managementRoute?.map(route=>( 
                        <NavLink key={route.rName} className='btn rounded-0 my-1 btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`${route.to}`}><span className='me-2 fs-5'>{route.icon}</span>{route.rName}</NavLink>       
                    ))
                } 
                  </List>
            
                   <List>
                    <h6 className='py-2 ps-4 fw-bold'>DEVELOPMENT</h6> 
                {
                    developmentRoute?.map(route=>( 
                        <NavLink key={route.rName} className='btn rounded-0 my-1 btn-hover w-100 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})}  to={`${route.to}`}><span className='me-2 fs-5'>{route.icon}</span>{route.rName}</NavLink>       
                    ))
                } 
                  </List>                     
            </Box>
            } 
        </>
    );
};

export default DashboardRoutes;