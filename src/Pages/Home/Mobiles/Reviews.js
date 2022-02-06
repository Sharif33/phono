import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Reviews.css";
import Marquee from "react-fast-marquee";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://peaceful-shore-84874.herokuapp.com/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <>
    <div className="text-center text-warning my-3">
          <h4>Top Reviews</h4>
          <hr />
        </div>
    <div className="bg-review">
        <Marquee gradient={false} speed={60}>
          {reviews?.map((review) => (
            <div key={review._id} className="m-4 rounded col card h-75">
              <div className="text-center p-3 px-2">
                 <img style={{ marginTop: "-2.2rem" }}  className="img-fluid w-25 rounded-circle" src={review?.image} alt="" /> 
                  {/* <Avatar alt="" src={review?.image}/> */} 
                <h6>{review?.name}</h6>
                <Rating
                  precision={0.5}
                  size="small"
                  value={Number(review?.rating)}
                  readOnly
                />
                <h6>{review?.mobile}</h6>
                <p style={{textAlign:"justify"}} className="text-secondary pb-4">{review?.description?.slice(0,100)}...</p>
              </div>
            </div>
          ))}
          </Marquee>    
        </div>
    </>
  );
};

export default Reviews;
