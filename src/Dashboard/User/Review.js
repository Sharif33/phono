import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const Review = ({ phones }) => {
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
    data.name=user?.displayName;
    data.email=user?.email;
    data.userImg=user?.photoURL;
    data.mobile=phones?.name;
    data.image=phones?.image;

    axios
      .post(`https://peaceful-shore-84874.herokuapp.com/reviews`, data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            'Thank You!',
            'You Shared Your Experience!',
            'success'
          )
          reset();
          console.log(res.data);
          // window.location.reload();
        }
      });
  };
  return (
    <div>
      <div className="m-auto">
        <div className=" p-4 rounded">
          <p className="text-custom">
            Share your experience for
            <span className="text-warning fs-5"> {phones?.name}</span>
          </p>
          {phones?.name && (
            <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
             {/*  <input
                className=" rounded"
                readOnly
                hidden
                defaultValue={user?.displayName}
                {...register("name")}
              />
              <input
                className=" rounded"
                readOnly
                hidden
                defaultValue={user?.email}
                {...register("email")}
              />
              <input
                className=" rounded"
                hidden
                defaultValue={user?.photoURL}
                {...register("userImg")}
              /> */}
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
            {/*   <input
                className=" rounded"
                hidden
                defaultValue={phones?.name}
                {...register("mobile")}
              />
              <input
                defaultValue={phones?.image}
                hidden
                readOnly
                {...register("image")}
              /> */}

              <textarea maxLength={200}
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
  );
};

export default Review;
