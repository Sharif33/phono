import React,{useState} from 'react';
import { TableBody, TableCell,  TableRow } from '@mui/material';
// import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { FiEdit } from "react-icons/fi";
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import EditOffer from './EditOffer';

// import { toast } from 'react-toastify';

 

const ApprovalOffer = ({mobile, mobiles, setMobiles}) => {
    // Approved by Admin
    const handleApproval = (id) => {
        fetch(`https://phono-server-production.up.railway.app/phones`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mobile)
        })
        .then(res => res.json())
        .then(data => {
            mobile.isApproved = data.isApproved;
            const updated = mobiles.map(single => {
                if (single._id === id) {
                    single.isApproved = mobile.isApproved;
                    return single;
                }
                else {
                    return single;
                }
            })
            setMobiles(updated);
        })
        .catch(error => { 
            // error.message('Something is missing')
            // if(error) {
            //     window.location.reload();
            // }
         });
    };

    // DELETE products
    const handleDeleteProducts = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec0554',
            cancelButtonText: 'No, keep me!',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {
            const url = `https://phono-server-production.up.railway.app/phones/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                          )
                        // console.log(data);
                        const remainingProducts = mobiles.filter(mobile => mobile._id !== id);
                        // console.log(remainingOrders);
                        setMobiles(remainingProducts);
                    }
                })
        }
    });
    } 

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
    setChecked(() => handleApproval(mobile?._id));
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
        <>
            <TableBody>
                    {
                        <TableRow hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {mobile.id}
                            </TableCell>
                            <TableCell >
                                <img style={{width:"2rem"}} src={mobile?.image} alt="" />
                                </TableCell>
                            <TableCell >{mobile.name}</TableCell>
                            <TableCell >{mobile.brand}</TableCell>
                            <TableCell >{mobile?.offerTill}</TableCell>
                            <TableCell align="center">
                                <Switch
                                checked={checked ? mobile?.isApproved : mobile?.isApproved}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                                size="small"
                                color="success" 
                                />
                               
                            </TableCell>
                            <TableCell align="center">
                                {/* <Link to={`${mobile?._id}`}></Link> */}
                                <IconButton onClick={() => setIsDrawerOpen(true)}>
                                <Tooltip title={`Edit ${mobile?.name}`} placement="top" arrow followCursor  TransitionComponent={Zoom}>
                                     <EditIcon size="small"/>
                                </Tooltip>
                                </IconButton>
                                
                            </TableCell>
                            <TableCell align="center">                             
                                <IconButton onClick={() => handleDeleteProducts(mobile?._id)} aria-label="delete"> <Tooltip title={`Delete ${mobile?.name}`} placement="top" arrow followCursor  TransitionComponent={Zoom}><DeleteIcon className='text-pink' />
                                </Tooltip>
                                </IconButton>  
                            </TableCell>
                        </TableRow>
                   }
                </TableBody> 
                <EditOffer
                isDrawerOpen = {isDrawerOpen}
                setIsDrawerOpen = {setIsDrawerOpen}
                mobile = {mobile}
                mobiles = {mobiles}
                setMobiles = {setMobiles}
                />
                
        </>
    );
};

export default ApprovalOffer;