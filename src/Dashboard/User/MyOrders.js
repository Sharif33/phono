
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';

const MyOrders = () => {
    let deleteCount = 0;
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const email = user?.email;
    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/myOrders/${email}`)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [email, deleteCount]);
    // console.log(orders);

    //Delete Part
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data);
            })
    }, []);

   
    //DELETE AN Products
    const handleDeleteOrders = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://peaceful-shore-84874.herokuapp.com/myOrders/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Canceled successfully');
                        // console.log(data);
                        const remainingOrders = orders.filter(order => order._id !== id);
                        console.log(remainingOrders);
                        // console.log(myOrders);
                        setOrders(remainingOrders);
                    }
                })
        }
    }
    return (
        <div>
             <div className="col-md-6 mx-auto text-center pb-3">
                <img className="img-fluid rounded-circle" src={user?.photoURL} alt="" />
                <h5 className="text-warning">{user?.displayName}</h5>
                <h4>Your order item: <span className="text-danger">{orders.length}</span></h4>
            </div>
            <div className="row row-cols-1 row-cols-md-4">
                {
                    orders?.map(order =>
                        <div key={order._id} className="col">
                            <div className="shadow p-3 text-end">
                                <div>
                                    <h6>Email : <span className="text-secondary"> {order?.email} </span></h6>
                                    <h6>Phone : <span className="text-secondary"> {order?.phone} </span></h6>
                                    <h6>Order Date : <span className="text-secondary"> {order?.date}, {order?.time} </span></h6>
                                    <h6>Price: <span className="text-danger">{order?.price} BDT</span> </h6>
                                    <img className="img-fluid" style={{ height: "15rem" }} src={order?.image} alt="" />
                                    <h6 className="text-center">{order?.mobile}</h6>
                                    <h6>{order.payment ? 'Paid'
                                    :
                                    <Link to={`/dashboard/pay/${order._id}`}><button className='btn btn-warning'>Pay</button></Link>}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-info">{order?.status}</button>
                                    <button onClick={() => handleDeleteOrders(order._id)} className="btn btn-danger">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default MyOrders;