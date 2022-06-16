import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            
            <div className='not-found'>
                <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_mm9kznkc.json"  background="transparent"  speed="1"  style={{height:"90vh"}}  loop  autoplay></lottie-player>
                <div className="not-found-home">
                <Link to={`/`}><button className='btn btn-custom'>Home</button></Link>
            </div>
            </div>
            
        </div>
    );
};

export default NotFound;