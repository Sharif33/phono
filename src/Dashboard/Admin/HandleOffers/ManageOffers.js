import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApprovalOffer from './ApprovalOffer';

const ManageOffers = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/phones`)
            .then(res => res.json())
            .then(data => setMobiles(data))
    }, [])

    return (
        <>
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" >
                <TableHead sx={{bgcolor: 'secondary.main'}}>
                    <TableRow>
                        <TableCell sx={{ color: 'secondary.main'}}>ID</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}}>Icon</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}}>Name</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}}>Brand</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}}>Exp. Date</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Published!</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Edit</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                    {mobiles.map((mobile) => {
                        return <ApprovalOffer 
                            key={mobile._id}
                            mobile = {mobile}
                            mobiles = {mobiles}
                            setMobiles = {setMobiles}
                        />
                    }     
                    )}
            </Table>
        </TableContainer>
    </>
    );
};

export default ManageOffers;