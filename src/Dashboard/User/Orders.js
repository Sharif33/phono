import React from 'react';
import { Link } from 'react-router-dom';
// import MyOrderDetails from './MyOrderDetails';

const Orders = ({order,statusNumber,handleDeleteOrders}) => {
    // const [openOrderDetails, setOpenOrderDetails] = React.useState(false);
    // const handleOpen = () => setOpenOrderDetails(true);
    // const handleClose = () => setOpenOrderDetails(false);
    return (
        <div>
            {/* <MyOrderDetails
                  handleClose={handleClose}
                  order={order}
                  openOrderDetails={openOrderDetails}
                  /> */}
                <div className="col bg-light">
                  <div className="border p-3 my-4">
                      <div>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div>
                            {order?.payment ? (
                          <h5>
                            {" "}
                            <span className="badge text-cenetr rounded-pill bg-success">
                              Paid
                            </span>{" "}
                          </h5>
                        ) : (
                          <div>
                            <Link to={`/dashboard/pay/${order._id}`}>
                              <button className="btn btn-custom btn-sm me-1">
                                Pay
                              </button>
                            </Link>

                            <button
                              onClick={() => handleDeleteOrders(order._id)}
                              className="btn btn-custom-2 btn-sm"
                            >
                              Cancel order
                            </button>
                          </div>
                        )}
                          </div>
                          <div>
                        <Link to={`/dashboard/myOrders/${order._id}`}> <button className='btn btn-outline-info btn-hover btn-sm rounded-0 mx-2'> Order Details</button> </Link>
                        </div>
                        </div>
                        
                        
                        <br />
                        <h6>
                          Order #
                          <span className="text-muted">
                            {" "}
                            {order?._id?.slice(-8)}{" "}
                          </span>
                        </h6>
                        <h6>
                          {" "}
                          &#x9F3;{" "}
                          <span className="text-muted"> {order?.total} </span>
                        </h6>
                        <h6>
                          Ordered:{" "}
                          <span className="text-muted">
                            {" "}
                            {order?.date}, {order?.time}{" "}
                          </span>
                        </h6>
                      </div>

                      {/* Progress tracker */}
                    <div>
                      <div className="progressbar-track">
                        <ul className="progressbar gap-3 text-center">
                          <li
                            id="step-1"
                            className={`${
                              statusNumber >= 1 && statusNumber <= 5
                                ? "text-muted green mr-3"
                                : statusNumber === 6
                                ? "text-danger"
                                : "gray mr-5"
                            }`}
                          >
                            {" "}
                            <button className="fas fa-gift border-0 bg-transparent"></button>{" "}
                          </li>
                          <li
                            id="step-2"
                            className={`${
                              statusNumber >= 2 && statusNumber <= 5
                                ? "text-muted green mr-3"
                                : statusNumber === 6
                                ? "text-danger"
                                : "gray mr-3"
                            }`}
                          >
                            {" "}
                            <button className="fas fa-check border-0 bg-transparent"></button>{" "}
                          </li>
                          <li
                            id="step-3"
                            className={`${
                              statusNumber >= 3 && statusNumber <= 5
                                ? "text-muted green mr-3"
                                : statusNumber === 6
                                ? "text-danger"
                                : "gray mr-3"
                            }`}
                          >
                            {" "}
                            <button className="fas fa-box border-0 bg-transparent"></button>{" "}
                          </li>
                          <li
                            id="step-4"
                            className={`${
                              statusNumber >= 4 && statusNumber <= 5
                                ? "text-muted green mr-3"
                                : statusNumber === 6
                                ? "text-danger"
                                : "gray mr-3"
                            }`}
                          >
                            {" "}
                            <button className="fas fa-truck border-0 bg-transparent"></button>{" "}
                          </li>
                          <li
                            id="step-5"
                            className={`${
                              statusNumber >= 5 && statusNumber <= 5
                                ? "text-muted green "
                                : statusNumber === 6
                                ? "text-danger"
                                : "gray"
                            }`}
                          >
                            {" "}
                            <button className="fas fa-box-open border-0 bg-transparent"></button>{" "}
                          </li>
                        </ul>
                        <div id="tracker"></div>
                     
                     
                    </div>
                          </div>
                   
                  </div>
                </div>
        </div>
    );
};

export default Orders;