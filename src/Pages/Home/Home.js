import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import Banner1 from "../Banner/Banner1";
import Banner2 from "../Banner/Banner2";
// import Banner3 from "../Banner/Banner3";
import Sponsors from "../Banner/Sponsors";
import Contact from "./Contact";
import Mobiles from "./Mobiles/Mobiles";
import Offers from "./Offers/Offers";
import {Helmet} from "react-helmet";
import CustomerReviewShow from "../../Dashboard/User/CustomerReviewShow";
import Banner4 from "../Banner/Banner4";
import AllProducts from "./Mobiles/AllProducts";
// import BottomHeader from "../../Shared/Header/BottomHeader";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | A online mobile shop</title>
                <link rel="canonical" href="/home" />
            </Helmet>
     <Header />
     {/* <BottomHeader/> */}
      <Banner1 />
      <Banner2 />
      <Offers/>
      <Banner4/>
      <Mobiles />
      <AllProducts/>
      {/* <Banner3 /> */}
      {/* <Reviews /> */}
      <Sponsors/>
      <CustomerReviewShow/>
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
