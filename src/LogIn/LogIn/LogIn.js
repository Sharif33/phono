import { Container, Typography, TextField, Button, CircularProgress, Alert, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';import {Helmet} from "react-helmet";

const LogIn = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, navigate)
    }
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Log in</title>
                <link rel="canonical" href="/login" />
            </Helmet>
<Header/>
            <div style={{paddingTop:"65px"}}>

            </div>
            <Container>
            <CssBaseline />
                <Grid sx={{ my: 4 }} container>
                    <Grid sx={{alignItems: 'center' }} className="p-4 shadow text-center rounded" item xs={12} md={6}>
                        {/* <Typography sx={{ letterSpacing: 4, fontWeight: 'bold' }} variant="h4" gutterBottom>Please   Login</Typography> */}
                            
            <LockOutlinedIcon sx={{ m: 1, color: 'secondary.main' }}/>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
      
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                id="standard-basic"
                                label="Your Email*"
                                name="email"
                                onChange={handleOnChange}
                                variant="outlined" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                id="standard-basic"
                                label="Your Password*"
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                variant="outlined"
                                />

                            <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/register">
                                <Button variant="text">New User? Please Register</Button>
                            </NavLink>
                            {isLoading && <CircularProgress />}
                            {user?.email && <Alert severity="success">Login successfully!</Alert>}
                            {authError && <Alert severity="error">{authError}</Alert>}
                        </form>
                        <Button onClick={handleGoogleSignIn} variant="contained">Google Sign In</Button>
                    </Grid>
                    <Grid className="p-4 text-center rounded" item xs={12} md={6}>
                        <img style={{ width: '100%' }} src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" alt="" />
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </>
    );
};

export default LogIn;