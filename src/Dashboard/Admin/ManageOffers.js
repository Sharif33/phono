import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageOffers = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/phones`)
            .then(res => res.json())
            .then(data => setMobiles(data))
    }, [])

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
            confirmButtonText: 'Yes, cancel it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {
            const url = `https://peaceful-shore-84874.herokuapp.com/phones/${id}`
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
    return (
        <div className="container py-4">
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" >
                <TableHead sx={{bgcolor: 'secondary.main'}}>
                    <TableRow>
                        <TableCell sx={{ color: 'secondary.main'}}>Name</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}}>Added by</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Price</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">ID</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Edit</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mobiles.map((mobile) => (
                        <TableRow hover
                            key={mobile._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {mobile.name}
                            </TableCell>
                            <TableCell align="center">{mobile?.adder}</TableCell>
                            <TableCell align="center">{mobile.price}</TableCell>
                            <TableCell align="center">{mobile.id}</TableCell>
                            <TableCell align="center"><Link to={`${mobile?._id}`}> <button className='btn btn-custom'> <i title='Update' className="fas fa-edit"></i> </button> </Link></TableCell>
                            <TableCell align="center"><button onClick={() => handleDeleteProducts(mobile?._id)} className="btn btn-custom-2"><i className="fas fa-trash"></i></button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
};

export default ManageOffers;