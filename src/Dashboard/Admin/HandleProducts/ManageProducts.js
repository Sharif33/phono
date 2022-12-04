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
import { Box } from '@mui/system';
import { Grid, MenuItem, TextField } from '@mui/material';
// const columns = ['Name','Added by','Price','ID','Edit','Action'];
const columns = [
    { id: 'name',  label: 'NAME', minWidth: 200, },
    { id: 'adder', label: 'ADDED BY', minWidth: 100 },
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'price', label: 'PRICE', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
  ];

const ManageProducts = () => {
    const [mobiles, setMobiles] = useState([]);
    // console.log(mobiles);

    useEffect(() => {
        fetch(`http://localhost:5000/mobiles`)
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
            const url = `http://localhost:5000/mobiles/${id}`
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

        /* Sorting */
        const [sorting, setSorting] = React.useState('');

    const handleSorting = (event) => {
      setSorting(event.target.value);
    };
 
    // sorting high to low price
    const sortHigh =()=>{
        const highPrice = searchProducts?.sort((a,b)=>a.price < b.price ? 1 : -1);
        return highPrice;
    } 
   

    // sorting low to high price
    const sortLow =()=>{
        const lowPrice = searchProducts?.sort((a,b)=>a.price > b.price ? 1 : -1);
        return lowPrice;
    } 
    
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
               <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', textAlign:'center',width: {xs:'85vw', sm:'85vw', md:'20vw'}, mb: 2 , boxShadow: 0 }}
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
            </Grid>
            <Grid item xs={12} md={4}>
               <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', textAlign:'center',width: {xs:'85vw', sm:'85vw', md:'20vw'}, mb: 2 , boxShadow: 0 }}
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
            </Grid>
           
            <Grid item xs={12} md={4}>
                <Box component="form" sx={{p: '2px 4px', textAlign: 'center',  overflow:"hidden" ,'& .MuiTextField-root': { m: 1,  minWidth:{xs:'80vw',sm:'80vw', md:'20vw'}}}}>
                        <TextField
                        id="filled-select-currency"
                        select
                        label='Sort By'
                        defaultValue="status"
                        value={sorting}
                        size="small"
                        onChange={handleSorting}
                        //   helperText={value? `${searchOrder?.length} order`:`Please select order status`}
                        variant='outlined'
                        >
                            <MenuItem onClick={sortHigh} value={0}>High to low Price</MenuItem>
                            <MenuItem onClick={sortLow} value={1}>Low to high Price</MenuItem>
                            
                        </TextField>       
                </Box>
            </Grid>
        </Grid>         
        
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 480 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                <TableCell sx={{ backgroundColor:"#F4F5F7", border: "0px", color:'#637381',minWidth: {xs:50} }}>SR</TableCell>
                <TableCell align='center' sx={{ backgroundColor:"#F4F5F7", border: "0px", color:'#637381',}}>
                    ICON
                </TableCell>
                {columns.map((column) => (
                    <TableCell
                    key={column?.id}
                    align={column?.align}
                    style={{ minWidth: column?.minWidth, backgroundColor:"#F4F5F7", border: "0px", color:'#637381' ,}}
                    >
                    {column?.label}
                    </TableCell>
                ))}
                <TableCell style={{ backgroundColor:"#F4F5F7", border: "0px", color:'#637381' }} align='center'>EDIT</TableCell>
                <TableCell style={{ backgroundColor:"#F4F5F7", border: "0px", color:'#637381' }} align='center'>ACTION</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {searchProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((phn,i) => {
                    return (
                        
                    <TableRow hover role="checkbox" tabIndex={-1} key={phn._id}>
                        <TableCell>{i+1}</TableCell>
                        <TableCell align='center' sx={{p:0}}>
                            <img style={{width:"1.25rem"}} src={phn?.image} alt="" />
                        </TableCell>
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