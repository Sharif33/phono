import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
// const columns = ['Name','Added by','Price','ID','Edit','Action'];

const ManageProducts = () => {
    const [mobiles, setMobiles] = useState([]);
    // console.log(mobiles);

    useEffect(() => {
        fetch(`https://phono-server-production.up.railway.app/mobiles`)
            .then(res => res.json())
            .then(data =>{
               setMobiles(data);
               setSearchProducts(data); 
            } )
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
            const url = `https://phono-server-production.up.railway.app/mobiles/${id}`
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
                        setSearchProducts(remainingProducts);
                    }
                })
        }
    });
    }

    //   Search
    const [searchProducts, setSearchProducts] = useState([]);
    // console.log(searchProducts);

    const handleSearch = (event) => {
      const searchWord = event.target.value;
      const newSearch = mobiles?.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.brand.includes(searchWord.toLowerCase()) ; 
      });
  setSearchProducts(newSearch);
    };
    return (
        <>
        <div className="container">
           <Box>
            <input style={{width:"25vw", border: "1px solid #e9edf4", borderRadius: "7px"}}
                className='bg-light p-2 mb-2'
                type="search"
                placeholder="Search by name or brand"
                // value={wordEntered}
                onChange={handleSearch}
                /> 
                <SearchIcon style={{color: "#ced4da"}}/>
        </Box>
        <Paper sx={{overflow: 'hidden' }}>
        <TableContainer  sx={{ maxHeight: 600}}>
            <Table stickyHeader aria-label="sticky table" >
            <TableHead sx={{bgcolor: 'secondary.main'}}>
            <TableRow>
                <TableCell sx={{ color: 'secondary.main'}}>Name ({mobiles?.length} mobile)</TableCell>
                <TableCell sx={{ color: 'secondary.main'}}>Added by</TableCell>
                <TableCell sx={{ color: 'secondary.main'}} align="center">Price</TableCell>
                <TableCell sx={{ color: 'secondary.main'}} align="center">ID</TableCell>
                <TableCell sx={{ color: 'secondary.main'}} align="center">Edit</TableCell>
                <TableCell sx={{ color: 'secondary.main'}} align="center">Action</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {searchProducts?.map((mobile) => (
                        <TableRow hover
                            tabIndex={-1}
                            key={mobile._id}
                            sx={{ border: 0 }}
                        >
                            <TableCell component="th" scope="row">
                                {mobile.name}
                            </TableCell>
                            <TableCell align="center">{mobile?.adder}</TableCell>
                            <TableCell align="center">{mobile.price}</TableCell>
                            <TableCell align="center">{mobile.id}</TableCell>
                            <TableCell align="center"><Link to={`${mobile?._id}`}> <button className='btn btn-purple'> <i title='Update' className="fas fa-edit"></i> </button> </Link></TableCell>
                            <TableCell align="center"><button onClick={() => handleDeleteProducts(mobile?._id)} className="btn btn-pink"><i className="fas fa-trash"></i></button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> 
        </Paper>
        </div>     
        
        </>
        
    );
};

export default ManageProducts;