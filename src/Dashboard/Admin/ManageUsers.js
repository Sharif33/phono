import React,{useState,useEffect} from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ManageUsers = () => {
const [allUsers,setAllUsers] = useState([]);
console.log(allUsers);
    useEffect(() => {
        let isMounted = true;
        fetch(`https://peaceful-shore-84874.herokuapp.com/users`)
            .then((res) => res.json())
            .then((data) => {
                if(isMounted ){
                   setAllUsers(data);
                    }
            }
            );
            return () => {
                isMounted = false;
                };
    }, []);
    return (
        <div>
            <div className="container py-4">
            <Paper sx={{ width: '100%', overflow: 'hidden', text: "justify" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table" >
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Email</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Name</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Phone</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Gender</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Address</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">City</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Country</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">Zip</TableCell>
                        <TableCell sx={{ color: 'secondary.main'}} align="center">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers.map((usr) => (
                        <TableRow hover
                            key={usr._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="justify">{usr?.email}</TableCell>
                            <TableCell sx={{width:"100"}} align="justify">{usr?.name ? usr.name : usr?.displayName}</TableCell>
                            <TableCell align="justify">{usr?.phone ? usr.phone : ' '}</TableCell>
                            <TableCell align="justify">{usr?.gender ? usr.gender : ' '}</TableCell>
                            <TableCell align="justify">{usr?.address ? usr.address : ' '}</TableCell>
                            <TableCell align="justify">{usr?.city ? usr.city : ' '}</TableCell>
                            <TableCell align="justify">{usr?.country ? usr.country : ' '}</TableCell>
                            <TableCell align="justify">{usr?.zip ? usr.zip : ' '}</TableCell>
                            <TableCell align="justify">{usr?._id?.slice(5,-5)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    </div>
        </div>
    );
};

export default ManageUsers;