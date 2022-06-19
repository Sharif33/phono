import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import "./MyOrders.css";
import Orders from "./Orders";

const MyOrders = () => {
  let deleteCount = 0;
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const email = user?.email;
  useEffect(() => {
    let isMounted = true;
    fetch(`https://peaceful-shore-84874.herokuapp.com/myOrders/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setOrders(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [email, deleteCount]);
  // console.log(orders);

  //Delete Part
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    let isMounted = true;
    fetch(`https://peaceful-shore-84874.herokuapp.com/orders`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setMyOrders(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [myOrders]);

  //DELETE AN Products
  const handleDeleteOrders = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#ec0554",
      cancelButtonText: "No, keep me!",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `https://peaceful-shore-84874.herokuapp.com/myOrders/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Canceled!",
                "Your order has been canceled.",
                "success"
              );
              const remainingOrders = orders.filter(
                (order) => order._id !== id
              );
              // console.log(remainingOrders);
              // console.log(myOrders);
              setOrders(remainingOrders);
            }
          });
      }
    });
  };
  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#EEF2FF" }}>
      <div className="container">
        
 <div className="col-md-6 mx-auto text-center pb-3">
        <h4>
          Total Order: <span className="text-danger">{orders.length}</span>
        </h4>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 px-5 border-end">
         <div className="row row-cols-1 row-cols-md-1 order">
        {orders
          ?.slice(0)
          .reverse()
          .map((order) => {
            let statusNumber;
            if (order?.status === "Pending...") {
              statusNumber = 1;
            } else if (order?.status === "Processing") {
              statusNumber = 2;
            } else if (order?.status === "Packed") {
              statusNumber = 3;
            } else if (order?.status === "Shipped") {
              statusNumber = 4;
            } else if (order?.status === "Delivered") {
              statusNumber = 5;
            } else if (order?.status === "Cancel") {
              statusNumber = 6;
            }
            return (
              <Orders
               key={order._id}
              order={order}
              statusNumber={statusNumber}
              handleDeleteOrders={handleDeleteOrders}
              >
              </Orders>             
            );
          })}
      </div> 
                </div>
                <div id="order" className="col-md-6 col-sm-12 p-3">
        <Outlet></Outlet>
                </div>
      </div>
      
      </div>
      
    </div>
  );
};

export default MyOrders;
