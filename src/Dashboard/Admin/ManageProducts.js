import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ManageProducts = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones`)
            .then(res => res.json())
            .then(data => setMobiles(data))
    }, [])

    // DELETE products
    const handleDeleteProducts = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://peaceful-shore-84874.herokuapp.com/phones/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Canceled successfully');
                        // console.log(data);
                        const remainingProducts = mobiles.filter(mobile => mobile._id !== id);
                        // console.log(remainingOrders);
                        setMobiles(remainingProducts);
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
                    {mobiles.map((mobile) => (
                        <TableRow
                            key={mobile._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {mobile.name}
                            </TableCell>
                            <TableCell align="right">{mobile.price}</TableCell>
                            <TableCell align="right">{mobile.id}</TableCell>
                            <TableCell align="right"><button onClick={() => handleDeleteProducts(mobile._id)} className="btn btn-danger">Delete</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
};

export default ManageProducts;