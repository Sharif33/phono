import React from 'react';
import moment from "moment";
import { Box, Rating } from "@mui/material";
import Review from './Review';

const ReviewFilter = ({filterReview, phones}) => {
    const total = filterReview.reduce(
        (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
        0
      );
      const avg = (total / filterReview?.length).toFixed(1);
    
      const starV = filterReview?.filter((star) => star?.rating === 5);
      const total5star = starV.reduce(
        (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
        0
      );
      const avg5star = (total5star / starV?.length).toFixed(1);
    
      const starIV = filterReview?.filter(
        (star) => star?.rating < 5 && star?.rating >= 4
      );
      const total4star = starIV.reduce(
        (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
        0
      );
      const avg4star = (total4star / starIV?.length).toFixed(1);
    
      const star3 = filterReview?.filter(
        (star) => star?.rating < 4 && star?.rating >= 3
      );
      const total3star = star3.reduce(
        (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
        0
      );
      const avg3star = (total3star / star3?.length).toFixed(1);
    
      const star2 = filterReview?.filter(
        (star) => star?.rating < 3 && star?.rating >= 2
      );
      const total2star = star2.reduce(
        (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
        0
      );
      const avg2star = (total2star / star2?.length).toFixed(1);
    
      const starI = filterReview?.filter(
        (star) => star?.rating < 2 && star?.rating >= 1
      );
      const totalIstar = starI.reduce(
        (total, currentItem) => (total = parseFloat(total + currentItem.rating)),
        0
      );
      const avgIstar = (totalIstar / starI?.length).toFixed(1);
    return (
        <div>
        <div className="py-4">
           <div>
              <p>Ratings & Reviews of {phones?.name}</p>
           </div>
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <div className="d-flex justify-content-evenly">
                  <div className="py-4 m-auto">
                    <h1 className="fw-bold">
                      {avg} <span className="fs-4 text-secondary">/5</span>
                    </h1>
                    <Rating
                      size="large"
                      name="half-rating-read"
                      value={Number(avg)}
                      precision={0.1}
                      readOnly
                    />
                    <br />
                    <small>{filterReview?.length} Ratings</small>
                  </div>

                  <div className="py-4 m-auto">
                    <div>
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg5star)}
                        precision={1}
                        readOnly
                      />
                      <span> ({starV?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg4star)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({starIV?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg3star)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({star3?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avg2star)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({star2?.length})</span>
                      <br />
                      <Rating
                        size="medium"
                        name="half-rating-read"
                        value={Number(avgIstar)}
                        precision={0.1}
                        readOnly
                      />
                      <span> ({starI?.length})</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <Review phones={phones} />
                </div>
            </div>
          </div>
          <div className="py-3">
        <h4 className="py-3"> {phones?.name} Reviews</h4>
        <div>
          {filterReview?.map((review) => (
            <div key={review?._id}>
              <ul className="list-group">
                <li className="list-group-item d-md-flex justify-content-between align-items-center">
                  <Box sx={{"& > legend": { mt: 2 },}}>
                    <Rating
                      name="half-rating-read"
                      precision={0.5}
                      size="small"
                      value={Number(review?.rating)}
                      readOnly
                    />
                    <br />
                    <small className="text-secondary">by {review?.name} </small>
                    <br />
                    <p>{review?.description}</p>
                    {/*  <img
                            style={{ width: "5vw" }}
                            className="img-fluid"
                            src={review?.image}
                            alt=""
                          />  */}
                  </Box>

                  <span className="text-secondary">
                    <small> { moment(new Date(review?.date)).fromNow() }</small>
                  </span>
                </li>
                <br />
              </ul>
            </div>
          ))}
        </div>
        
      </div>
        </div>
    );
};

export default ReviewFilter;