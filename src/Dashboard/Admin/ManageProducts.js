import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ManageProducts = () => {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/phones`)
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [])

    // DELETE products
    const handleDeleteProducts = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/phones/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Canceled successfully');
                        // console.log(data);
                        const remainingProducts = bikes.filter(bike => bike._id !== id);
                        // console.log(remainingOrders);
                        setBikes(remainingProducts);
                    }
                })
        }
    }
    return (
        <div className="container py-4">
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="Manage Products table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bikes.map((bike) => (
                        <TableRow
                            key={bike._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {bike.name}
                            </TableCell>
                            <TableCell align="right">{bike.price}</TableCell>
                            <TableCell align="right">{bike.id}</TableCell>
                            <TableCell align="right"><button onClick={() => handleDeleteProducts(bike._id)} className="btn btn-danger">Delete</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
};

export default ManageProducts;