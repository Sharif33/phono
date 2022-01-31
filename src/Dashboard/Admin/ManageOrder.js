import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You wanted to update this item order status!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec0554',
            cancelButtonText: 'No, keep me!',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {

            fetch(`https://peaceful-shore-84874.herokuapp.com/updateStatus/${id}`, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ status })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        Swal.fire(
                            'Done!',
                            'Status updated successfully!',
                            'success'
                          )
                        // window.location.reload();
                       
                        setOrders(orders)
                        setStatus(status)
                    }
                })
        }
    });

    };


    // DELETE order
    const handleDeleteOrders = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec0554',
            cancelButtonText: 'No, keep me!',
            confirmButtonText: 'Yes, Delete it!'
          }).then((result) => {
            if (result.isConfirmed) 
         {
            const url = `https://peaceful-shore-84874.herokuapp.com/orders/${id}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'This item has been deleted',
                            'success'
                          )
                        // console.log(data);
                        const remainingOrders = orders.filter(order => order._id !== id);
                        // console.log(remainingOrders);
                        setOrders(remainingOrders);
                    }
                })
        }
    });
    };
    return (
        <div className="row row-cols-1 row-cols-md-3 m-2 g-4">
        {
            orders?.map(order => <div key={order._id}>
                <div className="col">
                    <div className="card h-100 mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-sm-12 col-md-4 text-center">
                                <img src={order.image} className="img-fluid rounded-start" alt="..." />
                                {
                                        order?.payment ? <p className='btn-custom-3'>Paid</p>  :  <p className='btn-custom-2'>Unpaid</p>
                                    }
                            </div>
                            <div className="col-sm-12 col-md-8">
                                <div className="card-body">
                                    <small className="card-title text-success">{order?.mobile}</small>
                                    <p className="card-text">By : <span>{order?.name}</span></p>
                                    <p>{order.email}</p>
                                    <p>Date: {order?.date}, {order?.time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between btn-custom-3">
                            <div className="d-flex">
                                <select className="p-2 text-center btn-custom-3 border-0" onChange={handleStatus}>
                                    <option>{order?.status}</option>
                                    <option className='text-dark' value="Processing">Processing</option>
                                    <option className='text-dark' value="Shipped">Shipped</option>
                                    <option className='text-dark' value="Delivered">Delivered</option>
                                    </select>
                                    <button title='Click to update status' onClick={() => handleUpdate(order?._id)} className="btn btn-custom-3"><i className="fas fa-check"></i></button>
                            </div>
                                        
                                <button title='delete item' onClick={() => handleDeleteOrders(order?._id)} className="btn btn-custom-2"><i className="fas fa-trash"></i></button>
                                            
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