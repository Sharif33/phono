import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { numberFormat } from '../../Shared/numberFormat';
import { NavHashLink } from 'react-router-hash-link';
// import MyOrderDetails from './MyOrderDetails';

const Orders = ({order,statusNumber,handleDeleteOrders}) => {
    // const [openOrderDetails, setOpenOrderDetails] = React.useState(false);
    // const handleOpen = () => setOpenOrderDetails(true);
    // const handleClose = () => setOpenOrderDetails(false);
    const [descriptionCollapse, setDescriptionCollapse] = useState(false);

    const showMore = () => {
        setDescriptionCollapse(true);
    }
    const showLess = () => {
        setDescriptionCollapse(false);
    }
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
                            {
                            order?.payment ? (<h5><span className="badge text-cenetr rounded-pill bg-success">Paid</span></h5>) : (
                          <div>
                            <Link to={`/dashboard/pay/${order._id}`}>
                              <button className="btn btn-purple btn-sm me-1"> Pay</button>
                            </Link>
                            <button onClick={() => handleDeleteOrders(order._id)} className="btn btn-pink btn-sm">Cancel</button>
                          </div>)
                            }
                          </div>
                        <div>
                            
                            {
                               descriptionCollapse? 
                               <span onClick={showLess}><Link to={`/dashboard/myOrders`}> <button className='btn btn-cart'>Hide Details <span className="text-danger"><AiOutlineUp/></span> </button> </Link></span> :  <span onClick={showMore}><NavHashLink to={`/dashboard/myOrders/${order._id}#order`}> <button className='btn btn-cart'>View Details <span className="text-success"><AiOutlineDown/></span> </button> </NavHashLink></span>
                            }
                        </div>
                        </div>
                        <br />
                      <h6>Order #<span className="text-muted">{order?._id?.slice(-8)}</span></h6>
                      <h6>Tk<span className="text-muted"> {numberFormat(order?.total).slice(3)} </span></h6>
                      <h6> Ordered: <span className="text-muted">{order?.date}, {order?.time}</span></h6>
                      </div>

                      {/* Progress tracker */}
                    <div>
                      <div className="progressbar-track pe-3">
                        <ul className="progressbar gap-3 text-center">

                          <li id="step-1" className={`${statusNumber >= 1 && statusNumber <= 5 ? "green" : statusNumber === 6 ? "text-danger" : "text-secondary"}`} >
                            <i className="fas fa-gift border-0 bg-transparent"></i>
                          </li>

                          <li id="step-2" className={`${statusNumber >= 2 && statusNumber <= 5 ? "green" : statusNumber === 6 ? "text-danger" : "text-secondary" }`} >
                            <i className="fas fa-check border-0 bg-transparent"></i>
                          </li>

                          <li
                            id="step-3" className={`${ statusNumber >= 3 && statusNumber <= 5 ? "green" : statusNumber === 6 ? "text-danger" : "text-secondary" }`}>
                            <i className="fas fa-box border-0 bg-transparent"></i>
                          </li>

                          <li id="step-4" className={`${ statusNumber >= 4 && statusNumber <= 5 ? "green" : statusNumber === 6 ? "text-danger" : "text-secondary" }`}>
                            <i className="fas fa-truck border-0 bg-transparent"></i>
                          </li>

                          <li id="step-5" className={`${ statusNumber >= 5 && statusNumber <= 5 ? "green " : statusNumber === 6 ? "text-danger" : "text-secondary" }`}>  
                            <i className="fas fa-box-open border-0 bg-transparent"></i>
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