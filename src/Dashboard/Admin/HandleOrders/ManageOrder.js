import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CheckOutlined, DeleteOutline } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { CircularProgress,MenuItem} from '@mui/material';
import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

const columns = [
    { id: 'phone',  label: 'Phone', maxWidth: 100, color:"#fe3c47" },
    { id: 'date', label: 'date', maxWidth: 100 },
    { id: 'id', label: 'ID', maxWidth: 100 },
    { id: 'name', label: 'Name', maxWidth: 100 },
    { id: 'email', label: 'Email', maxWidth: 100 },
    { id: 'amount', label: 'Amount', maxWidth: 100 },
    { id: 'payment', label: 'Payment', maxWidth: 100 },
    { id: 'transId', label: 'Trans.', maxWidth: 100 },
    { id: 'track', label: 'Track.Id', maxWidth: 100 },
    { id: 'status', label: 'Status', maxWidth: 100 },
    { id: 'action', label: 'Action',color:"#fe3c47" },
  ];

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const allOrdrs = orders?.reverse().sort((a,b)=> new Date(a.date) < new Date(b.date) ? 1 : -1);
    // console.log(allOrdrs);
    const [status, setStatus] = useState('');
    const [value, setValue] = React.useState('');
    const statuses = ['Processing','Packed','Shipped','Delivered','Cancel'];
    const filterStatuses = ['Pending...','Processing','Packed','Shipped','Delivered','Cancel'];

    const handleStatus = (e,newValue) => {
        setStatus(e.target.value);
      
    }

   
  const handleChange = (e) => {
      setValue(e.target.value);
  };
  /* const handleChange = (event, newValue) => {
      setValue(newValue);
  }; */

    useEffect(() => {
        let isMounted = true;
        fetch(`https://phono-server-production.up.railway.app/orders`)
            .then((res) => res.json())
            .then((data) => {
                if(isMounted ){
                   setOrders(data);
                   setSearchOrder(data);
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

            fetch(`https://phono-server-production.up.railway.app/updateStatus/${id}`, {
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
                        // setValue(status);
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
            const url = `https://phono-server-production.up.railway.app/orders/${id}`
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

    //Table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
      };

    //   Search
    const [searchOrder, setSearchOrder] = useState([]);
    // console.log(searchOrder);

    const handleFilter = (event) => {
      const searchWord = event.target.value;
      const newSearch = allOrdrs.filter((value) => {
        return value.orderBy.toLowerCase().includes(searchWord.toLowerCase()) || value.phone.includes(searchWord) ; 
      });
  setSearchOrder(newSearch);
    };

    /* Filter by status */
    const filterResult = (orderStatus) => {
        const result = allOrdrs.filter(currentData => {
            return currentData.status === orderStatus;
        });
        setSearchOrder(result);
        // console.log(result)
    }
    const filterPaidPending = () => {
        const result = allOrdrs.filter(currentData => {
            return currentData.status === 'Pending...' && currentData?.payment;
        });
        setSearchOrder(result);
        // console.log(result)
    }
    const filterPayment = () => {
        const result = allOrdrs.filter(currentData => {
            return currentData?.payment
        });
        setSearchOrder(result);
        // console.log(result)
    }
    const filterUnPayment = (unpaid) => {
        const result = allOrdrs.filter(currentData => {
            return currentData?.payment === unpaid?.payment
        });
        setSearchOrder(result);
        // console.log(result)
    }
  
    return (
        <div style={{overflowX:"hidden"}} className="container py-2">
            <div className='d-flex justify-content-evenly align-items-center py-1'>
              <div>
                <input style={{width:"25vw", border: "1px solid #e9edf4", borderRadius: "7px"}}
                className='bg-light mx-1 p-2 mb-2'
                type="search"
                placeholder="Search by phone or name"
                // value={wordEntered}
                onChange={handleFilter}
                /> 
                    <SearchIcon style={{color: "#ced4da"}}/>
            </div>
            <div>
    <Box  component="form" sx={{'& .MuiTextField-root': { m: 1, width: '20vw' },}} noValidate autoComplete="off">
        <TextField
          id="filled-select-currency"
          select
          label={value ? `${searchOrder?.length} order(s)`:`sort by status`}
          defaultValue="status"
          value={value}
          size="small"
          onChange={handleChange}
        //   helperText={value? `${searchOrder?.length} order`:`Please select order status`}
          variant='outlined'
        >
            <MenuItem disabled value={value}/>
            <MenuItem onClick={filterPaidPending} value='Paid & Pending'>Paid & Pending</MenuItem>
            {
                filterStatuses.map(status=>
                    <MenuItem onClick={() => filterResult(status)} key={status} value={status}>{status}</MenuItem>  
                )
            }
            <MenuItem onClick={filterPayment} value='Paid'>Paid</MenuItem>
            <MenuItem onClick={()=>filterUnPayment('Unpaid')} value='Unpaid'>Unpaid</MenuItem>
            <MenuItem onClick={() => setSearchOrder(allOrdrs)} value="All">All</MenuItem>
        </TextField>
    </Box>  
            </div>  
            </div> 
         {
                orders?.length === 0 ? <CircularProgress align="center"/>
                    :     
        <Paper sx={{ overflow: 'hidden' }}> 
         <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table stickyHeader aria-label="sticky table" >
                <TableHead >
                    <TableRow>
                    {columns.map((column) => (
                            <TableCell
                            sx={{  border: "0px"}}
                            key={column.id}
                            style={{ maxWidth: column?.maxWidth, color: column?.color, fontSize:"1rem", backgroundColor:"#F4F5F7" }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {
                    searchOrder?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                        <TableRow hover
                            key={order._id}
                            sx={{  border: "0px"}}
                        >
                            <TableCell sx={{  border: "0px"}} component="th" scope="row">
                            {order?.phone}
                            </TableCell>
                            <TableCell sx={{ minWidth:"11vw",border:"0px"}}>{order?.date}</TableCell>
                            <TableCell sx={{  border: "0px"}}>{order?._id?.slice(0,10)}</TableCell>
                            <TableCell  sx={{ minWidth:"14vw",border:"0px"}}>{order?.name  ? order.name : order?.orderBy}</TableCell>
                            <TableCell sx={{  border: "0px"}}>{order?.email}</TableCell>
                            <TableCell sx={{  border: "0px"}}>{order?.total}&#2547; </TableCell>
                            <TableCell sx={{  border: "0px"}}>
                                {
                                    order?.payment ? <Typography sx={{ color: 'success.main'}}>Paid</Typography> :  <Typography sx={{ color: 'error.main'}}>Unpaid</Typography>
                                }
                            </TableCell>
                            <TableCell sx={{ color: 'primary.main', border:"0px"}}>{order?.payment?.last4}</TableCell>
                            <TableCell sx={{ color: 'primary.main', border:"0px"}}>{order?.tracking?.slice(10)}</TableCell>
                            <TableCell sx={{  border: "0px"}}>
                                <div className="d-flex p-0">
                                <select className="text-center custom-form border-0" onChange={handleStatus}>
                                    <option>{order?.status}</option>
                                    {statuses.map((value) => (
                                    <option value={value} key={value}>{value}</option>
                                ))}
                                    </select>
                                    <IconButton sx={{p:0, m:0}} onClick={() => handleUpdate(order?._id)} >
                                        <CheckOutlined size="small" color="success"/>
                                    </IconButton>
                            </div></TableCell>
                            <TableCell sx={{  border: "0px"}}> 
                                    <IconButton sx={{p:0, m:0}} onClick={() => handleDeleteOrders(order?._id)} >
                                        <DeleteOutline size="small" color="error"/>
                                    </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
                    rowsPerPageOptions={[8, 15, 25, 30, 50, 75, 100]}
                    component="div"
                    count={orders?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>            
            }
           
       
    </div>
    );
};

export default ManageOrder;