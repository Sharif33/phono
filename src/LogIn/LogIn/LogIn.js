import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  CssBaseline,
  IconButton,
  InputAdornment,
  Breadcrumbs,
} from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth/useAuth";
/* import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer'; */
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Helmet } from "react-helmet";
import gIcon from "../../../src/images/googleIcon.png";
import { Box } from "@mui/system";
import "./LogIn.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ForgetPass from "./ForgetPass";

const LogIn = () => {
  const [loginData, setLoginData] = useState({});
  const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  /* Email Password  Login*/
  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, navigate);
    e.preventDefault();
  };

  /* Google Login */
  const handleGoogleSignIn = () => {
    signInWithGoogle(location, navigate);
  };
  
  /* Forget Password */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Phono | Log in</title>
        <link rel="canonical" href="/login" />
      </Helmet>
      <Container>
        <CssBaseline />
        <Breadcrumbs sx={{ mt: 5 }} aria-label="breadcrumb">
          <Link className="text-secondary" to="/">
            {" "}
            Home{" "}
          </Link>
          <Typography color="primary">Login</Typography>
        </Breadcrumbs>
        <Grid sx={{ mt: 5, maxHeight: "100vh" }} container>
          <Grid
            sx={{ alignItems: "center", textAlign: "center" }}
            item
            xs={12}
            md={6}
          >
            {/* <Typography sx={{ letterSpacing: 4, fontWeight: 'bold' }} variant="h4" gutterBottom>Please   Login</Typography> */}
            <Box className="py-4 shadow-sm rounded ">
              <LockOutlinedIcon sx={{ m: 1, color: "secondary.main" }} />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <form onSubmit={handleLoginSubmit}>
                <TextField
                  type="email"
                  sx={{ width: "75%", m: 1 }}
                  id="standard-basic"
                  label="Your Email*"
                  name="email"
                  onChange={handleOnChange}
                  variant="outlined"
                />

                <TextField
                  sx={{ m: 1, width: "75%" }}
                  id="standard-basic2"
                  label="Password*"
                  type={showPass ? "text" : "password"}
                  name="password"
                  onChange={handleOnChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color={showPass ? "info" : "inherit"}
                          onClick={() => setShowPass(!showPass)}
                          sx={{ p: "10px" }}
                          aria-label="password"
                        >
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                
                <Button
                  sx={{ width: "75%", m: 1 }}
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
               
              </form>

               
                <ForgetPass
                open = {open}
                handleOpen = {handleOpen}
                handleClose = {handleClose}
                />
              {isLoading && <CircularProgress />}
              {user?.email && <Alert severity="success">Login successfully!</Alert>}
              {authError && <Alert severity="error">{authError}</Alert>}
              <Box sx={{ my: 2, display:"flex", alignItems:"center" , justifyContent:'space-evenly'}}>
                <Button size="small" variant="text" color="error" onClick={handleOpen}>
                  Forget Password?
                </Button>
                <NavLink to="/register">
                  <Button size="small" variant="text">New User? Please Register</Button>
                </NavLink>
              </Box>
              <p className="hr-lines">OR</p>
              <button
                className="btn p-0 pe-3 border btn-light bg-cart"
                onClick={handleGoogleSignIn}
              >
                <span>
                  <img className="img-fluid" src={gIcon} alt="GoogleIcon" />
                </span>
                Sign In with google
              </button>
            </Box>
          </Grid>
          <Grid
            sx={{ backdropFilter: "blur(20px)" }}
            className="p-4 text-center rounded nav-hidder"
            item
            xs={12}
            md={6}
          >
            <lottie-player
              src="https://assets3.lottiefiles.com/private_files/lf30_m6j5igxb.json"
              background="transparent"
              speed="1"
              style={{ width: "100%" }}
              loop
              autoplay
            ></lottie-player>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LogIn;
