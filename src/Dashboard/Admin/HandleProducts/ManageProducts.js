import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { DeleteForever, EditOutlined } from '@mui/icons-material';
// const columns = ['Name','Added by','Price','ID','Edit','Action'];
const columns = [
    { id: 'name',  label: 'Name', minWidth: 100, color:"#fe3c47" },
    { id: 'adder', label: 'Added By', minWidth: 100 },
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'price', label: 'price', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
  ];

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


        /* Table */
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
    return (
        <>         
        <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '25vw', mb: 2 , boxShadow: 0 }}
                >
                <IconButton sx={{ p: '10px',color: "#ced4da"}} aria-label="search">
                <SearchIcon />
                </IconButton>
            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                type='search'
                onChange={handleSearch}
                placeholder="Search by name or brand"
            />
        </Paper>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column?.id}
                    align={column?.align}
                    style={{ minWidth: column?.minWidth,fontSize:"1rem", backgroundColor:"#F4F5F7", border: "0px", color:'#637381' }}
                    >
                    {column?.label}
                    </TableCell>
                ))}
                <TableCell style={{fontSize:"1rem", backgroundColor:"#F4F5F7", border: "0px", color:'#637381' }} align='center'>Edit</TableCell>
                <TableCell style={{fontSize:"1rem", backgroundColor:"#F4F5F7", border: "0px", color:'#637381' }} align='center'>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {searchProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((phn) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={phn._id}>
                        {columns.map((column) => {
                        const value = phn[column?.id];
                        return (
                            <TableCell key={column?.id} align={column?.align}>
                            {column?.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                        <TableCell sx={{p:0}} align="center">
                        <Link to={`${phn?._id}`}> 
                        <IconButton color='info'>
                            <EditOutlined/>
                        </IconButton> 
                        </Link>
                        </TableCell>

                        <TableCell sx={{p:0}} align="center">
                            <IconButton color='error' onClick={() => handleDeleteProducts(phn?._id)}>
                                <DeleteForever/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={searchProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
        
    </>            
    );
};

export default ManageProducts;