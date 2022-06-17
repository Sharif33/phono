import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { numberFormat } from '../../Shared/numberFormat';

const MyOrderDetails = () => {
  const {id} = useParams();
  const [order, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`https://peaceful-shore-84874.herokuapp.com/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setOrders(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
    return (
        <>
            {/* <Modal
                open={openOrderDetails}
                onClose={handleClose}
                center
                aria-labelledby="my-modal-title"
  aria-describedby="my-modal-description"
              > */}
                <div className='bg-light rounded p-2'>
                    <div>
                    <h3 className="text-center">Order Details</h3>
                       
                    </div>
                  <div className="p-2">
              <div className='border text-center text-secondary'>
                  <h5 className="fw-bold pt-2">Address</h5>
                  <address>{order?.address} , {order?.city} <br />
                  {order?.email} , {order?.phone}
                  </address>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                    <h4 className="text-center fw-bold"> {order?._id?.slice(-8)}</h4>
                        <span>
                        {order?.date}, {order?.time}
                        </span>

                    </div>
              <ul className="list-group">
                {order?.orderItems?.map((item) => (
                  <li
                    key={item?._id}
                    className="list-group-item d-flex justify-content-between align-items-center border-0"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {
                          item.os ? <Link title="See Details" to={`/mobile/${item?._id}`}>
                          <img
                            style={{ width: "3rem" }}
                            className="img-fluid"
                            src={item?.image}
                            alt=""
                          />
                        </Link> :
                        <Link title="See Details" to={`/mobile2/${item._id}`}>
                          <img
                            style={{ width: "3rem" }}
                            className="img-fluid"
                            src={item?.image}
                            alt=""
                          />
                        </Link>
                        }
                        
                      </div>
                      <div className="px-3 text-center">
                        <p>
                          {item?.name} <br />
                          <span className="text-secondary">
                            <small>{item?.brand} </small>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <small className="text-secondary">
                        <span>{item?.cartQuantity}</span> x{" "}
                        <span>{numberFormat(item?.price).slice(3,-3)}	&#x9F3;</span>
                      </small>
                    </div>
                    <span className="text-primary fw-bold fs-6">
                      {numberFormat(item?.price * item?.cartQuantity).slice(3,-3)} Tk
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center fs-5 border">
                  Total Items
                  <span className="text-primary fw-bold fs-5">
                    {order?.items}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                  Items Quantity
                  <span className="text-primary fw-bold fs-5">
                    {order?.quantity}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fs-4 fw-bold">
                  Total
                  <span className="text-danger fw-bold fs-5">
                    {numberFormat(order?.total).slice(3)} Tk
                  </span>
                </li>
              </ul>
            </div>
                                
            </div> 
              {/* </Modal> */}
        </>
    );
};

export default MyOrderDetails;