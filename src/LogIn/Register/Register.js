import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Helmet } from "react-helmet";
import gIcon from "../../../src/images/googleIcon.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, registerUser, isLoading, authError, signInWithGoogle } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
      toast.error("Your password did not match");
      return;
    }
    registerUser(loginData.email, loginData.password, loginData.name, loginData.phoneNumber, navigate);
    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, navigate);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Phono | Register</title>
        <link rel="canonical" href="/register" />
      </Helmet>
      <Container>
        <CssBaseline />
        <Box>
          <Breadcrumbs sx={{ mt: 5 }} aria-label="breadcrumb">
            <Link className="text-secondary" to="/">
              Home
            </Link>
            <Typography color="primary">Register</Typography>
          </Breadcrumbs>
          <Grid
            sx={{ mt: 3, maxHeight: "100vh", overflowX: "hidden" }}
            container
          >
            <Grid
              sx={{ alignItems: "center", textAlign: "center" }}
              item
              xs={12}
              md={6}
            >
              <Box className="py-3 shadow-sm rounded ">
                <LockOutlinedIcon sx={{ m: 1, color: "secondary.main" }} />
                <Typography variant="h5">Create an account</Typography>

                {!isLoading && (
                  <form onSubmit={handleLoginSubmit}>
                    <TextField
                      sx={{ width: "85%", m: 1 }}
                      id="outlined-basic3"
                      label="Your Name"
                      name="name"
                      onBlur={handleOnBlur}
                      variant="outlined"
                      required
                    />
                    <TextField
                      sx={{ width: "85%", m: 1 }}
                      id="outlined-basic4"
                      label="Your Email"
                      name="email"
                      type="email"
                      onBlur={handleOnBlur}
                      variant="outlined"
                      required
                    />
                    <TextField
                      sx={{ width: "85%", m: 1 }}
                      id="outlined-basic5"
                      label="Your Phone Number"
                      name="phoneNumber"
                      type="number"
                      onBlur={handleOnBlur}
                      variant="outlined"
                    />
                    <TextField
                      sx={{ width: "85%", m: 1 }}
                      id="outlined-basic6"
                      label="Password"
                      type={showPass ? "text" : "password"}
                      name="password"
                      onBlur={handleOnBlur}
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
                      required
                    />
                    <TextField
                      sx={{ width: "85%", m: 1 }}
                      id="outlined-basic7"
                      label="Confirm Password"
                      type={showPass ? "text" : "password"}
                      name="password2"
                      onBlur={handleOnBlur}
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
                      required
                    />

                    <Button
                      sx={{ width: "85%", m: 1 }}
                      type="submit"
                      variant="contained"
                    >
                      Register
                    </Button>
                    <NavLink to="/login">
                      <Button variant="text">
                        Already Registered? Please Login
                      </Button>
                    </NavLink>
                  </form>
                )}
                {isLoading && <CircularProgress />}
                {user?.email && <Alert severity="success">User Created successfully!</Alert>}
                {authError && <Alert severity="error">{authError}</Alert>}

                <p className="hr-lines">Or</p>
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
        </Box>
      </Container>
    </>
  );
};

export default Register;
