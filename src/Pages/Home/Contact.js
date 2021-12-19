import React from 'react';
import call from "../../images/phone-icn.png";
import chat from "../../images/chat-icn.png";
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div>
            <div className='p-5 container'>
            <div className='text-center'>
                <h3>WELCOME TO PHONO SUPPORT. WE'RE HERE TO HELP.</h3>
                <h5 className='text-secondary'>ALWAYS ON YOUR SIDE WHEN YOU NEED HELP</h5>
            </div>
            <div className='row my-5'>
                <div className='col-sm-12 col-md-6 text-center'>
                <div className='d-flex justify-content-center align-items-center py-5 px-2 border rounded'>
                <img className='px-3 img-fluid' src={call} alt="" />
                        <div>
                            <h6>HAVE ANY DOUBTS?</h6>
                            <h4>CALL US NOW</h4>
                            <small>This Number is Toll Free</small> <br />
                            <small>0000 - 123 - 456789</small>
                        </div>
                    </div>
                    <div style={{marginTop:"-20px"}}>
                    <Link to="/contact"><button className='btn btn-dark rounded-pill'>View More</button></Link>
                    </div>
               
                </div>
                <div className='col-sm-12 col-md-6 text-center'>
                <div className='d-flex justify-content-center align-items-center border px-2 py-5 rounded'>
                <img className='px-3 img-fluid' src={chat} alt="" />
                        <div>
                            <h6>WANNA TALK TO US?</h6>
                            <h4>LIVE CHAT NOW</h4>
                            <small>If you have any question?</small> <br />
                            <small>Just saying us</small>
                        </div>
                    </div>
                    <div style={{marginTop:"-20px"}}>
                    <Link to="/contact"><button className='btn btn-dark rounded-pill'>View More</button></Link>
                    </div>
               
                </div>
                

            </div>
        </div>
        </div>
    );
};

export default Contact;