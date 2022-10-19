import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    // console.log(orders);
    const [status, setStatus] = useState("");

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        let isMounted = true;
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders`)
            .then((res) => res.json())
            .then((data) => {
                if(isMounted ){
                   setOrders(data);
                    }
            }
            );
            return () => {
                isMounted = false;
                };
    }, []);

    // Update Status
    const handleUpdate = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Update this item order status?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec0554',
            cancelButtonText: 'No, keep me!',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {

            fetch(`https://peaceful-shore-84874.herokuapp.com/updateStatus/${id}`, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ status })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.modifiedCount > 0) {
                        Swal.fire(
                            'Done!',
                            'Status updated successfully!',
                            'success'
                          )
                        // window.location.reload();
                       
                        setOrders(orders);
                        setStatus(status);
                    }
                })
        }
    });

    };


    // DELETE order
    const handleDeleteOrders = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec0554',
            cancelButtonText: 'No, keep me!',
            confirmButtonText: 'Yes, Delete it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {
            const url = `https://peaceful-shore-84874.herokuapp.com/orders/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'This item has been deleted',
                            'success'
                          )
                        // console.log(data);
                        const remainingOrders = orders.filter(order => order._id !== id);
                        // console.log(remainingOrders);
                        setOrders(remainingOrders);
                    }
                })
        }
    });
    };
    return (
        <div className="container py-4">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table" >
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ color: 'secondary.main'}}>Image</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}}>Mobile</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">ID</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Name</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Email</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Price</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Payment</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Trns.id</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Status</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow hover
                            key={order._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            <img style={{width:"5rem"}} className='img-fluid' src={order?.image ? order.image : order?.orderItems[0]?.image} alt="" />
                            </TableCell>
                            <TableCell align="center">{order?.mobile ? order.mobile : order?.orderItems[0]?.name}</TableCell>
                            <TableCell align="center">{order?._id?.slice(0,10)}</TableCell>
                            <TableCell align="center">{order?.name  ? order.name : order?.orderBy}</TableCell>
                            <TableCell align="center">{order?.email}</TableCell>
                            <TableCell align="center">{order?.price}&#2547; </TableCell>
                            <TableCell align="center">
                                {
                                    order?.payment ? <Typography sx={{ color: 'success.main'}}>Paid</Typography> :  <Typography sx={{ color: 'error.main'}}>Unpaid</Typography>
                                }
                            </TableCell>
                            <TableCell sx={{ color: 'primary.main'}} align="center">{order?.payment?.last4}</TableCell>
                            <TableCell align="center"><div className="d-flex">
                                <select className="text-center custom-form border-0" onChange={handleStatus}>
                                    <option>{order?.status}</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Packed">Packed</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancel">Cancel</option>
                                    </select>
                                <button title='Click to update status' onClick={() => handleUpdate(order?._id)} className="btn btn-indigo"><i className="fas fa-check"></i></button>
                            </div></TableCell>
                            <TableCell align="center"> <button title='delete item' onClick={() => handleDeleteOrders(order?._id)} className="btn btn-pink"><i className="fas fa-trash"></i></button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    </div>
    );
};

export default ManageOrder;