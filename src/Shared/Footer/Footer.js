import React from 'react';
import { SiWhatsapp,SiDiscord,SiTwitter,SiFacebook,SiYoutube } from "react-icons/si";
import { Link } from 'react-router-dom';
import logo from '../../images/favicon.png';
import strip from '../../images/strip.png';
import './Footer.css';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <>
            <footer style={{ backgroundColor: "#183153" }}>
                <div className="container">
                    <div className="row row-cols-2 row-cols-md-3 m-auto text-light">
                <div className="p-4 m-auto">
                        {/* <h3 className="pb-2 text-warning fw-bold">PH<span className="text-danger">|O|</span>NO</h3> */}
                        <div>
                             <img className='img-fluid footer-img' src={logo} alt="" />
                        </div>
                       
                        <div className="d-flex justify-contet-evenly align-items-center py-3">
                            <a className='mx-2' href="/"><SiYoutube style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='mx-2' href="/"><SiFacebook style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='mx-2' href="/"><SiDiscord style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='mx-2' href="/"><SiTwitter style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='mx-2' href="/"><SiWhatsapp style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                        </div>
                    </div>
                    <div className="p-4 m-auto">
                        <h4 style={{color:"#D7E1F7"}} className="pb-2"> <span className="border-bottom border-info">Services</span></h4>
                        <ul style={{ listStyleType: 'disc'}}>
                            <li><Link className='text-light footer-srvc' to={`/contact`}> Contact Us</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/about`}>About</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/mobiles`}>Mobiles</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/blog`}>Blog</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/terms`}>Terms and Services</Link></li>
                            <li><a target="_blank" rel="noreferrer" className="text-light footer-srvc"href="https://sharif-rashed.netlify.app/"> Developer</a></li>
                        </ul>
                    </div>
                    <div className="p-4 m-auto text-center">
                        <img src={strip} alt="" className="img-fluid rounded" />
                    </div>
                    
                </div>
                </div>
                
                <div className=" border-top border-secondary text-light text-center p-4">
                    <small>Copyright <span>&copy;</span>{date} <span> <a target="_blank" rel="noreferrer" className="text-warning"href="https://sharif-rashed.netlify.app/"> Sharif Mohammad Rashed</a></span> All rights reserved.</small>
                </div>
            </footer>
        </>
    );
};

export default Footer;