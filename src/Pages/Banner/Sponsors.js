import React from "react";
import Marquee from "react-fast-marquee";
import s1 from '../../images/samsung.png'
import s2 from '../../images/huawei.png'
import s3 from '../../images/vivo.png'
import s4 from '../../images/oppo.png'
import s5 from '../../images/mi.png'
import s6 from '../../images/iphone.png'
import s7 from '../../images/lenevo.png'
const Sponsors = () => {
  return (
    <>
    <div className="pb-5">
      <Marquee gradient={false} speed={60}>
          <img className="img-fluid p-3 mx-2" src={s1} alt="" />
          <img className="img-fluid p-3 mx-2" src={s2} alt="" />
          <img className="img-fluid p-3 mx-2" src={s3} alt="" />
          <img className="img-fluid p-3 mx-2" src={s4} alt="" />
          <img className="img-fluid p-3 mx-2" src={s5} alt="" />
          <img className="img-fluid p-3 mx-2" src={s6} alt="" />
          <img className="img-fluid p-3 mx-2" src={s7} alt="" />
      </Marquee>
    </div>
      
    </>
  );
};

export default Sponsors;
