import { Container, Typography, TextField, Button, CircularProgress, Alert, Box } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import {Helmet} from "react-helmet";
import gIcon from '../../../src/images/googleIcon.png';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { user, registerUser, isLoading, authError, signInWithGoogle } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, navigate);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, navigate)
    }
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Register</title>
                <link rel="canonical" href="/register" />
            </Helmet>
            <Header></Header>
            <Container >
                <Box>
                    <Grid container >
                    <Grid className="text-center" item xs={12} md={6}>
                        

                <Box className="py-4 my-5 shadow-sm rounded ">
            <LockOutlinedIcon sx={{ m: 1, color: 'secondary.main' }}/>
            <Typography variant="h5" gutterBottom>Create an account</Typography>

                        {!isLoading && 
                                <form onSubmit={handleLoginSubmit}>
                                    <TextField
                                        sx={{ width: '75%', m: 1 }}
                                        id="outlined-basic3"
                                        label="Your Name"
                                        name="name"
                                        onBlur={handleOnBlur}
                                        variant="outlined" />
                                    <TextField
                                        sx={{ width: '75%', m: 1 }}
                                        id="outlined-basic4"
                                        label="Your Email"
                                        name="email"
                                        type="email"
                                        onBlur={handleOnBlur}
                                        variant="outlined" />
                                    <TextField
                                        sx={{ width: '75%', m: 1 }}
                                        id="outlined-basic5"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        onBlur={handleOnBlur}
                                        variant="outlined" />
                                    <TextField
                                        sx={{ width: '75%', m: 1 }}
                                        id="outlined-basic6"
                                        label="Confirm Password"
                                        type="password"
                                        name="password2"
                                        onBlur={handleOnBlur}
                                        variant="outlined" />

                                    <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Register</Button>
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to="/login">
                                        <Button variant="text">Already Registered? Please Login</Button>
                                    </NavLink>
                                </form>}
                                {isLoading && <CircularProgress />}
                                {user?.email && <Alert severity="success">User Created successfully!</Alert>}
                                {authError && <Alert severity="error">{authError}</Alert>}
                                
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
                </Box>
                
            </Container>
            <Footer/>
        </>
    );
};

export default Register;