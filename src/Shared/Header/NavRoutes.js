import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MailIcon from '@mui/icons-material/Mail';
import { List, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavRoutes = () => {
    return (
        <>
           <List>
                            <ListItem sx={{display:{xs:'flex', sm:'flex', md:'none', xl:'none'}}} disablePadding>     
                            <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={{textDecoration:"none", }} to="/search">
                                <input style={{width:"50vw", border: "1px solid #e9edf4", borderRadius: "7px"}}
                                className='mx-1 p-2'
                                type="search"
                                placeholder="Search"
                                />
                                <span className="searchIcon">
                                <SearchIcon  style={{color:"#183153"}}/> </span>
                                </NavLink>                           
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to="/"><HomeIcon className='mx-3'/> Home</NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to="/mobiles"><ShoppingBagIcon className='mx-3'/> Shop</NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} href="#contact" to="/contact"><MailIcon className='mx-3'/> Contact</NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink className='py-2 btn-hover w-100 mb-2 text-start' style={({isActive})=> ({color: isActive ? '#38D373' : '#637381', textDecoration: isActive ?'none' : 'none',backgroundColor: isActive ? 'rgba(0, 171, 85, 0.08)': ''})} to="/about"><GroupsIcon className='mx-3'/> About</NavLink>
                            </ListItem>
                            </List> 
        </>
    );
};

export default NavRoutes;