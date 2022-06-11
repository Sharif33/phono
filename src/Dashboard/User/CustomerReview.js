import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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
          .post(`https://peaceful-shore-84874.herokuapp.com/cReviews`, data)
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
                center
                aria-labelledby="my-modal-title"
                aria-describedby="my-modal-description"
              >
        <div className="m-auto">
          <div className=" p-4 rounded">
            <div>
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
          </div>
        </div>
        </Modal>
      </>
    );
};

export default CustomerReview;