import React, { useEffect, useState } from 'react';
// import './Header.css';
import {HiOutlineChevronUp} from "react-icons/hi";

const ScrollTop = () => {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
    return (
        <>
            {showButton && (
                <span>
                    <HiOutlineChevronUp onClick={scrollToTop} className="back-to-top fs-2 p-1 text-center"/>
                </span>
    
      )}
        </>
    );
};

export default ScrollTop;