import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { numberFormat } from "../../Shared/numberFormat";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const MyOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrders] = useState([]);
  // console.log(order);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    fetch(`https://phono-server-production.up.railway.app/orders/${id}`)
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
      <div id="order" className="bg-light rounded">
        <IconButton size="small" color="error" onClick={() => navigate(-1)}>
          <AiOutlineClose />
        </IconButton>
        <div>
          <h3 className="text-center">Order Details</h3>
        </div>
        <div className="p-2">
          <div className="border text-center text-secondary">
            <h5 className="fw-bold pt-2">Address</h5>
            <address>
              {order?.billingAddress?.address} , {order?.billingAddress?.city} <br />
              {order?.billingAddress?.name} , {order?.billingAddress?.phone}, {order?.billingAddress?.email}
            </address>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2">
            <h6 className="text-center fw-bold"> {order?._id?.slice(-8)}</h6>
            <span style={{ fontSize: "0.8em" }}>
              {order?.date}, {order?.time}
            </span>
          </div>
          <TableContainer>
            <Table>
              <TableBody>
                {order?.orderItems?.map((item) => (
                  <TableRow key={item?._id} sx={{ border: 0 }}>
                    <TableCell>
                      {item.os ? (
                        <Link title="See Details" to={`/mobile/${item?._id}`}>
                          <img
                            style={{ width: "1.5rem" }}
                            src={item?.image}
                            alt=""
                          />
                        </Link>
                      ) : (
                        <Link title="See Details" to={`/mobile2/${item._id}`}>
                          <img
                            style={{ width: "2rem" }}
                            src={item?.image}
                            alt=""
                          />
                        </Link>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {item?.name}
                      <br />
                      <small className="text-secondary">
                        &#x9F3;{numberFormat(item.price).slice(3, -3)}
                        <AiOutlineClose />
                        {item?.cartQuantity}
                      </small>
                    </TableCell>
                    <TableCell>
                      {item?.cartQuantity
                        ? numberFormat(item?.price * item?.cartQuantity).slice(3,-3)
                        : numberFormat(item?.price).slice(3, -3)}&#x9F3;
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell sx={{ border: 0 }} />
                  <TableCell colSpan={1}>Subtotal</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {numberFormat(order?.subtotal).slice(3)}&#x9F3;
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }} />
                  <TableCell colSpan={1}>Tax</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {numberFormat(order?.tax).slice(3)}&#x9F3;
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }} />
                  <TableCell sx={{ border: 0 }} colSpan={1}>
                    Total
                  </TableCell>
                  <TableCell
                    sx={{ border: 0, fontWeight: "bold" }}
                    align="left"
                  >
                    {numberFormat(order?.total).slice(3)}&#x9F3;
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default MyOrderDetails;
