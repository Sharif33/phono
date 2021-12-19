import React from 'react';
import "./AboutUs.css";
import about from "../../images/about.jpg";
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';

const AboutUs = () => {
    return (
        <div>
             <Header />
           <div style={{paddingTop:"70px"}} className='bg-about text-light'>
                <div className='container py-5'>
                <h3>About phono</h3> <br />
                <p>phono is a technology brand officially established on May 4, 2018 by Sky Li. The aspiration of phono is to provide products with a comprehensive superior experience for the young, and phono is committed to be a trendsetting technology brand.</p> <br />
                <p>Due to the abilities in cutting-edge technologies of smartphones and IoT, phono brings consumers products with trendsetting technologies, features and trendsetting experiences that are first applied in the price segment.</p> <br />
                <p>At the beginning of 2020, phono announced its dual driven strategy of “Smartphone + AIoT”. In June of 2020, phono's global users of smartphone reached 35 million and its sales volume of AIoT audio products broke the record of 1 million. According to the statistics of Counterpoint global smartphone shipments in Q1 of 2020, the emerging smartphone brand phono still ranks 7th with year-over-year growth rate of 157% which ranks the first in the world as well. As the world's fastest-growing smartphone brand, phono stands firmly among the mainstream smartphone brands.</p>
                </div>
           </div>
           <div>
               <img className='img-fluid' src={about} alt="" />
           </div>
           <Footer/>
        </div>
    );
};

export default AboutUs;