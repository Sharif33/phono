import React from 'react';

const Banner2 = () => {

    /* useEffect(() => {
        const script = document.createElement('script');
    
        script.src = `https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js`;
        script.async = true;
        script.defer = true;
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []); */

    return (
        <div>
            <div className='row row-cols-2 row-cols-md-4 my-2 g-2 bg-cart'>
                <div className='col m-auto'>
                    <div className='d-flex justify-content-evenly align-items-center p-3'>
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_gesnvxtv.json"  background="transparent"  speed="1"  style={{width:"6rem"}}  loop  autoplay></lottie-player>
                        <div className='pt-3'>
                            <h6 className='fw-bold'>FREE SHIPPING</h6>
                            <small>For orders over 50000tk</small>
                        </div>
                    </div>
                </div>
                <div className='col m-auto'>
                <div className='d-flex justify-content-evenly align-items-center p-3'>
                        <lottie-player src="https://assets9.lottiefiles.com/private_files/lf30_trawmi6s.json"  background="transparent"  speed=".5"  style={{width:"5rem"}}  loop  autoplay></lottie-player>
                        <div className='pt-3'>
                            <h6 className='fw-bold'>OFFICIAL DISCOUNT</h6>
                            <small>Save Big on next product</small>
                        </div>
                    </div>
                </div>
                <div className='col m-auto'>
                <div className='d-flex justify-content-evenly align-items-center p-3'>
                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_0vKKEb.json"  background="transparent"  speed=".5"  style={{width:"6rem"}} loop  autoplay></lottie-player>
                        <div className='pt-3'>
                            <h6 className='fw-bold'>FREE RETURN</h6>
                            <small>Within 15 days returns</small>
                        </div>
                    </div>
                </div>
                <div className='col m-auto'>
                <div className='d-flex justify-content-evenly align-items-center p-3'>
                <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_a8ubrpbq.json"  background="transparent"  speed="1"  style={{width:"6rem"}}  loop  autoplay></lottie-player>
                        <div className='pt-3'>
                            <h6 className='fw-bold'>24/7 HELPLINE</h6>
                            <small>Care till the end</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container text-center my-5 pt-5'>
                <div>
                    <h4 style={{color:"#093843"}}>WHAT MAKES THE ESSENTIAL DIFFERENT?</h4>
                    <h6 className='text-secondary' >EXPERIENCE HIGH PERFORMANCE AND SECURE</h6>
                </div>
                <div className='row row-cols-1 row-cols-md-3 m-2 g-4 text-start'>
                <div className='col'>
                    <div className='d-flex justify-content-evenly align-items-center bg-light card-hover rounded p-2'>
                        <div className='p-2 w-100'>
                            <h6 className='text-primary'>PERFECT CUT</h6>
                            <h5>DUAL CAMERA</h5>
                        </div>
                        <lottie-player className="img-fluid w-100" src="https://assets8.lottiefiles.com/private_files/lf30_izjlsxva.json"  background="transparent"  speed=".5"   style={{ height: "10rem"}}  loop  autoplay></lottie-player> 
                    </div>
                </div>
                <div className='col'>
                    <div className='d-flex justify-content-evenly align-items-center bg-light card-hover rounded p-2'>
                        <div className='p-2 w-100'>
                            <h6 className='text-primary'>PRETTY</h6>
                            <h5>INTELLIGENT PROCESSING</h5>
                        </div>
                        <lottie-player className="img-fluid w-100" src="https://assets2.lottiefiles.com/packages/lf20_rloy7en0.json"  background="transparent"  speed=".5"   style={{ height: "10rem"}}  loop autoplay></lottie-player>
                    </div>
                </div>
                <div className='col'>
                    <div className='d-flex justify-content-evenly align-items-center bg-light card-hover rounded p-2'>
                        <div className='p-2 w-100'>
                            <h6 className='text-primary'>MOST POPULAR</h6>
                            <h5>8GB DDR5 RAM</h5>
                        </div>
                        <lottie-player className="img-fluid w-100" src="https://assets10.lottiefiles.com/private_files/lf30_qimecffl.json"  background="transparent"  speed=".3"   style={{ height: "10rem"}}  loop  autoplay></lottie-player>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default Banner2;