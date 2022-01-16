import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(`pk_test_51K8PMbFRrgTUsmgBK0HIVHahI69rtmPuecs2jQzhAziBS6lS0GZaiYikrCf49J72ee2RZG585NUATSMOlVUUV4sx0072UsTUV4`);

const Payment = () => {
    const {id} = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders/${id}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [id]);
    return (
        <div>
            <div className='text-center py-4'>
            <h3>Dear <span className='text-warning'>{appointment.name}</span> please pay for </h3>
            </div>
            <div className='row p-4'>
                <div className='col-sm-12 col-md-6 border p-4 bg-white'>
                    <div>
                        <h5 className='text-secondary'>Item Name: <span className='text-dark'>{appointment.mobile}</span></h5>
            <h6>Pay: {appointment.price}</h6>
                    </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <div>
                    {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
                    </div>
                </div>
            </div>
             
         
        </div>
    );
};

export default Payment;