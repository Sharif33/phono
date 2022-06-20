import React from 'react';
import { SiWhatsapp,SiDiscord,SiTwitter,SiFacebook,SiYoutube } from "react-icons/si";
import { Link, NavLink } from 'react-router-dom';
// import logo from '../../images/favicon.png';
import strip from '../../images/strip.png';
import './Footer.css';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <>
            <footer style={{ backgroundColor: "#183153" }}>
                <div className="container">
                    <div className="row row-cols-2 row-cols-md-4 m-auto text-light py-3">
                <div className="m-auto">
                        <div>
                            <NavLink className="navbar-brand fw-bold fs-1 text-warning" to="/home">PH<span className="text-danger">|O|</span>NO</NavLink>
                        </div>
                       
                        <div className="d-flex justify-contet-evenly align-items-center py-3">
                            <a className='me-2' href="/"><SiYoutube style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='me-2' href="/"><SiFacebook style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='me-2' href="/"><SiDiscord style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='me-2' href="/"><SiTwitter style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                            <a className='' href="/"><SiWhatsapp style={{color:"#D7E1F7"}} className='footer-icon'/></a>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <h5 style={{color:"#D7E1F7"}} className="pb-2"> <span className="border-bottom border-info">Services</span></h5>
                        <ul style={{ listStyleType: 'disc'}}>
                            <li><Link className='text-light footer-srvc' to={`/contact`}> Contact us</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/about`}>About us</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/mobiles`}>Mobiles</Link></li>  
                            <li><Link className='text-light footer-srvc' to={`/blog`}>Blog</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <h5 style={{color:"#D7E1F7"}} className="pb-2"> <span className="border-bottom border-info">Customer Care</span></h5>
                        <ul style={{ listStyleType: 'disc'}}>
                            <li><Link className='text-light footer-srvc' to={`/`}>Return & Refunds</Link></li>
                            <li><Link className='text-light footer-srvc' to={`/`}>Terms and Conditions</Link></li>
                            <li><a target="_blank" rel="noreferrer" className="text-light footer-srvc"href="https://sharif-rashed.netlify.app/"> Developer</a></li>
                        </ul>
                    </div>
                    <div className="m-auto text-center">
                        <img src={strip} alt="" className="img-fluid rounded" />
                    </div>
                    
                </div>
                </div>
                
                <div style={{backgroundColor:"rgb(0 0 0 / 14%)"}} className="text-light text-center p-4">
                    <small><span>&copy;</span>{date}  All rights reserved by <span> <a target="_blank" rel="noreferrer" className="text-warning footer-srvc"href="https://sharif-rashed.netlify.app/"> Sharif Mohammad Rashed</a></span></small>
                </div>
            </footer>
        </>
    );
};

export default Footer;