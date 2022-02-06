import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(`pk_test_51K8PMbFRrgTUsmgBK0HIVHahI69rtmPuecs2jQzhAziBS6lS0GZaiYikrCf49J72ee2RZG585NUATSMOlVUUV4sx0072UsTUV4`);

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(() => loadStripe(`pk_test_51K8PMbFRrgTUsmgBK0HIVHahI69rtmPuecs2jQzhAziBS6lS0GZaiYikrCf49J72ee2RZG585NUATSMOlVUUV4sx0072UsTUV4`));
    const {id} = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders/${id}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [id]);
    return (
        <div>
                <div className='col-sm-12 col-md-8 mx-auto p-4 btn-custom rounded'>
                    <div className='p-4 text-center'>
                        <h3><span className='text-warning'>{appointment.name}</span> please pay for </h3>
                        <h5 className='text-light'>{appointment.mobile}</h5>
                        <h6>Total Amount : <span className='text-info'>{appointment.price}&#2547;</span> </h6>
                    </div>
                    <div>
                    {appointment?.price && <Elements setStripePromise={setStripePromise} stripe={stripePromise}>
                    <CheckoutForm
                    appointment={appointment}
                    />
                    </Elements>}
                    </div>
                </div>  
        </div>
    );
};

export default Payment;