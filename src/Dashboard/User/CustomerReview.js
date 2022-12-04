import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:"90vw", sm: "90vw", md:"40vw"},
  bgcolor: 'background.paper',
 borderRadius:'7px',
  boxShadow: 24,
  p: 4,
//   overflowY:"scroll"
};

const CustomerReview = ({openReviewNow, handleClose}) => {
    const labels = {
        0.5: "Useless",
        1: "Useless+",
        1.5: "Poor",
        2: "Poor+",
        2.5: "Ok",
        3: "Ok+",
        3.5: "Good",
        4: "Good+",
        4.5: "Excellent",
        5: "Excellent+",
      };
      const [value, setValue] = React.useState(1);
      const [hover, setHover] = React.useState(-1);
      const { register, handleSubmit, reset } = useForm();
      const { user } = useAuth();
    
      const onSubmit = (data) => {
        // console.log(data);
        data.rating=value;
        data.date=new Date().toDateString();
        data.time=new Date().toLocaleTimeString();
        data.eName=user.displayName;
        data.email=user.email;
        data.userImg=user?.photoURL;
    
        axios
          .post(`http://localhost:5000/cReviews`, data)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire(
                'Thank You!',
                'For Review us!',
                'success'
              )
              handleClose();
              reset();
              // console.log(res.data);
              // window.location.reload();
            }
          });
      };
    return (
        <>
        <Modal
                open={openReviewNow}
                onClose={handleClose}
                aria-labelledby="my-modal-title3"
                aria-describedby="my-modal-description3"
              >
          <Box sx={style}>
                  <div style={{marginTop:"-1.8rem",marginRight:"-1.8rem"}} className="text-end">
                    <button onClick={handleClose} className='btn text-danger'><CloseIcon/></button>
                  </div>
            <div>
              <h4 className="text-center">Welcome <span className="text-primary fw-bold">{user?.name ? user.name : user?.displayName}</span> </h4>
              {
              user?.email && (
              <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
               
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    type="number"
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
                <input className=" rounded border" {...register("name")} placeholder="Your Name" />
                <input className=" rounded border" {...register("occupation")} placeholder="Your Occupation" />
                <textarea style={{minHeight:"10rem"}} maxLength={300}
                  className="rounded w-100 p-3 border-0"
                  {...register("description")}
                  placeholder="This is my first choice..."
                />
                <Button
                  sx={{ width: "100%", letterSpacing: 4 }}
                  type="submit"
                  variant="contained"
                >
                  share
                </Button>
              </form>
            )}
            </div> 
          
        </Box>
        </Modal>
      </>
    );
};

export default CustomerReview;