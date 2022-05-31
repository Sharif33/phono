import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    // const { admin } = useAuth();
    const {token} = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch(`https://peaceful-shore-84874.herokuapp.com/users/admin`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setSuccess(true);
                }
            })

        e.preventDefault()
    }
    return (
        <div className="container p-4 text-center">
            <div className="p-4 rounded shadow bg-light col-md-6 mx-auto">
                <h2>Make an Admin</h2>
                <form onSubmit={handleAdminSubmit}>
                    <TextField
                        sx={{ width: '100%' }}
                        label="Email"
                        type="email"
                        onBlur={handleOnBlur}
                        variant="standard" /> <br />
                    <Button sx={{ m: 2 }} type="submit" variant="contained">Make Admin</Button>
                </form>
                {success && <Alert severity="success">Made Admin successfully!</Alert>}
            </div>
        </div>
    );
};

export default MakeAdmin;