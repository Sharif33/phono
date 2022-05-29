import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import {Helmet} from "react-helmet";

const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Contact us : support</title>
                <link rel="canonical" href="/mobiles" />
            </Helmet>
             <Header />
           <div className='bg-light'>
            <div  style={{paddingTop:"70px"}} className='bg-about text-light'>
            <div className='container py-5 text-center'>
                <h1 className='fw-bold'>CONTACT US</h1>
                <h5 className='text-secondary'>GET IN TOUCH WITH THE BELOW LOCATION AND CONTACT DETAILS</h5>
                </div>
            </div>
            
            <div className='container p-3'>
            <div className='row row-cols-1 row-cols-md-3'>
                <div className='col'>
                    <div className='card-hover bg-white p-3 rounded'>
                        <h4><i className="fas rounded-circle p-3 bg-dark text-light fa-phone-alt"></i></h4>
                        <h3 className='fw-bold'>PHONE</h3>
                        <p><span className='fw-bold text-secondary'>Toll-Free:</span>  0000 - 123 - 456789</p>
                        <p><span className='fw-bold text-secondary'>Fax:</span>  0000 - 123 - 456789</p>
                    </div>
                </div>
                <div className='col'>
                    <div className='card-hover bg-white p-3 rounded'>
                        <h4><i className="fas rounded-circle p-3 bg-dark text-light fa-envelope"></i></h4>
                        <h3 className='fw-bold'>EMAIL</h3>
                        <p>mail@example.com</p>
                        <p>support@example.com</p>
                    </div>
                </div>
                <div className='col'>
                    <div className='card-hover bg-white p-3 rounded'>
                        <h4><i className="fas rounded-circle p-3 bg-dark text-light fa-location-arrow"></i></h4>
                        <h3 className='fw-bold'>ADDRESS</h3>
                        <p>No: 58 A, East Madison Street,</p>
                        <p>Baltimore, MD, USA 4508</p>
                    </div>
                </div>
            </div>
            <div className='py-5'>
                <h4 className='py-2 fw-bold'>CONTACT FORM</h4>
            <div className="mb-3 d-flex justify-content-between">
  <input type="text" className="form-control rounded-pill w-50 mx-2" id="exampleFormControlInput1" placeholder="Name"/>
  <input type="email" className="form-control rounded-pill w-50 mx-2" id="exampleFormControlInput1" placeholder="Email"/>
  <input type="number" className="form-control rounded-pill w-50 mx-2" id="exampleFormControlInput1" placeholder="Phone"/>
</div>
<div className="mb-3">
  <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Message' rows="3"></textarea>
</div>
<div className='text-center'>
    <button className='btn btn-dark btn-lg w-25 rounded-pill'>Send</button>
</div>

            </div>
            </div>
        </div> 
        <Footer/>
        </div>
        
    );
};

export default ContactUs;