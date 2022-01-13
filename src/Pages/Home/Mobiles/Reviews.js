import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://peaceful-shore-84874.herokuapp.com/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <>
      <div className="mt-5 px-5 py-2 shadow bg-review rounded">
        <div className="text-center text-warning">
          <h4>Top Reviews</h4>
          <hr />
        </div>
        <div className="row row-cols-1 row-cols-md-4">
          {reviews?.slice(0, 4).map((review) => (
            <div key={review._id} className="col my-4">
              <div className="text-center border bg-white mt-4 shadow px-1">
                <img className="img-fluid w-25 rounded-circle" style={{ marginTop: "-2.2rem" }} src={review?.image} alt="" />
                <h6>{review?.name}</h6>
                <Rating
                  name="half-rating-read"
                  precision={0.5}
                  size="small"
                  value={Number(review?.rating)}
                  readOnly
                />
                <h6>{review?.mobile}</h6>
                <p className="text-secondary">{review?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
