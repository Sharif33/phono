import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Alert, IconButton, TextField } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "90vw", sm: "90vw", md: "30vw" },
    bgcolor: '#F4F8F9',
    borderRadius: '7px',
    boxShadow: 24,
    px: 4,
    py:2,
};
const ForgetPass = ({open,handleClose}) => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [eError, setEerror] = useState(false);
    // console.log(eError);

      /* Reset Password */
      const forgetPassword = () =>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
        setEmail('');
        setErrMsg(' ');
        handleClose();
        toast.info("Password reset email sent! Check your mail's inbox or spam.")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMsg(errorCode || errorMessage);
            setEerror(true);
            toast(`${errorCode || errorMessage}`)
          });
        }

        setTimeout(() => {
            setEerror(false);
        }, 50000);

    return (
        <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>     
          <Box sx={style}>
               
            <TextField
                sx={{ width: "100%", my: 1 }}
                id="standard-basic"
                label="Your Email*"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
            />
            {
                eError && <Alert severity="error">{errMsg}</Alert>
            }
            
            <Box sx={{display:"flex", alignItems:"center", justifyContent:'space-between'}}>
            <Button onClick={forgetPassword}>Reset Password</Button>
            <IconButton onClick={handleClose} color='error'>
                <CloseOutlined/>
            </IconButton> 
            </Box>
            
          </Box>
        </Fade>
      </Modal>
    </div>
    );
};

export default ForgetPass;