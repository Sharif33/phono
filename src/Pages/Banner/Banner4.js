import React from 'react';
import { Link } from 'react-router-dom';
import vlm from '../../images/Home_Combo_KV_Main-KV_1440x640_pc.mp4';

const Banner4 = () => {
    return (
        <div className='video container'>
            <div className="vd-text px-4">
                <h4 className='fw-bold vd-text1'>Galaxy Z Fold4 | Z Flip4</h4>
                <strong className="text-navi vd-text2">Unbelievable tech <br /> Unbreakable design </strong>
                <br /> <br />
                <Link to="/mobiles"><button className="btn btn-cart rounded-0">Load more</button></Link>
            </div>
            <div className='vdoPlay'>
                <video style={{width:"92vw"}} muted autoPlay loop  src={vlm}></video>
            </div>
            
        </div>
    );
};

export default Banner4;