import React, { useEffect, useState } from 'react';

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders`)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    // Update Status
    const handleUpdate = (id) => {
        const proceed = window.confirm('Are you sure, you want to Update?');
        if (proceed) {

            fetch(`https://peaceful-shore-84874.herokuapp.com/updateStatus/${id}`, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ status })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert('Update Successful');
                        window.location.reload();
                    }
                })
        }

    };


    // DELETE order
    const handleDeleteOrders = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://peaceful-shore-84874.herokuapp.com/orders/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Canceled successfully');
                        // console.log(data);
                        const remainingOrders = orders.filter(order => order._id !== id);
                        // console.log(remainingOrders);
                        setOrders(remainingOrders);
                    }
                })
        }
    };
    return (
        <div className="row row-cols-1 row-cols-md-3 m-2 g-4">
        {
            orders?.map(order => <div key={order._id}>
                <div className="col">
                    <div className="card h-100 mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-sm-12 col-md-4">
                                <img src={order.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-sm-12 col-md-8">
                                <div className="card-body">
                                    <small className="card-title text-success">{order?.mobile}</small>
                                    <p className="card-text">By : <span>{order?.name}</span></p>
                                    <p>{order.email}</p>
                                    <p>Date: {order?.date}, {order?.time}</p>
                                    <div>
                                        <input className="w-100 text-center mb-2" onChange={handleStatus} type="text" defaultValue={order?.status} />
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => handleDeleteOrders(order?._id)} className="btn btn-custom-2">Delete</button>
                                            <button onClick={() => handleUpdate(order?._id)} className="btn btn-custom">Shipped ?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    </div>
    );
};

export default ManageOrder;