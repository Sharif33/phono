import React from 'react';
import call from "../../images/phone-icn.png";
import chat from "../../images/chat-icn.png";
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <>
            <div className='p-5 my-5 container'>
            <div className='text-center'>
                <h3 style={{color:"#093843"}}>WELCOME TO PHONO SUPPORT. WE'RE HERE TO HELP.</h3>
                <h6 className='text-secondary'>ALWAYS ON YOUR SIDE WHEN YOU NEED HELP</h6>
            </div>
            <div className='row my-5'>
                <div className='col-sm-12 col-md-6 text-center'>
                <div className='d-flex justify-content-center align-items-center py-5 px-2 border rounded'>
                <img className='px-3 img-fluid' src={call} alt="" />
                        <div>
                            <h6>HAVE ANY DOUBTS?</h6>
                            <h4 className='text-primary'>CALL US NOW</h4>
                            <small>This Number is Toll Free</small> <br />
                            <small className='text-primary'>0000 - 123 - 456789</small>
                        </div>
                    </div>
                    <div style={{marginTop:"-20px"}}>
                    <Link to="/contact"><button className='btn btn-purple rounded-pill'>View More</button></Link>
                    </div>
               
                </div>
                <div className='col-sm-12 col-md-6 text-center'>
                <div className='d-flex justify-content-center align-items-center border px-2 py-5 rounded'>
                <img className='px-3 img-fluid' src={chat} alt="" />
                        <div>
                            <h6>WANNA TALK TO US?</h6>
                            <h4 className='text-primary'>LIVE CHAT NOW</h4>
                            <small>If you have any question?</small> <br />
                            <small className='text-primary'>Just saying us</small>
                        </div>
                    </div>
                    <div style={{marginTop:"-20px"}}>
                    <Link to="/contact"><button className='btn btn-purple rounded-pill'>View More</button></Link>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;