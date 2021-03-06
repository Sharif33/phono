import { Container, Typography, TextField, Button, CircularProgress, Alert, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Helmet} from "react-helmet";
import gIcon from '../../../src/images/googleIcon.png';
import { Box } from '@mui/system';
import './LogIn.css';

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
                <Grid sx={{ my: 2 }} container>
                    <Grid sx={{alignItems: 'center' }} className="text-center" item xs={12} md={6}>
                        {/* <Typography sx={{ letterSpacing: 4, fontWeight: 'bold' }} variant="h4" gutterBottom>Please   Login</Typography> */}
            <Box className="py-4 shadow-sm rounded ">
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
                                id="standard-basic2"
                                label="Password*"
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                variant="outlined"
                                />

                            <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                            
                            {isLoading && <CircularProgress />}
                            {user?.email && <Alert severity="success">Login successfully!</Alert>}
                            {authError && <Alert severity="error">{authError}</Alert>}
                        </form>
                        <Box sx={{my:2}}>
                        <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/register">
                                <Button variant="text">New User? Please Register</Button>
                            </NavLink>
                        </Box>
                        <p className="hr-lines">Or</p>
                        <button className='btn p-0 pe-3 border btn-light bg-cart' onClick={handleGoogleSignIn}>
                            <span><img className='img-fluid' src={gIcon} alt="GoogleIcon" /></span>
                            Sign In with google</button>
            </Box>   
            
                    </Grid>
                    <Grid className="p-4 text-center rounded nav-hidder" item xs={12} md={6}>
                    <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_m6j5igxb.json"  background="transparent"  speed="1"  style={{width:"100%"}} loop  autoplay></lottie-player>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </>
    );
};

export default LogIn;