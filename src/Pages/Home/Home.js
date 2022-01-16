import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import Banner1 from "../Banner/Banner1";
import Banner2 from "../Banner/Banner2";
import Banner3 from "../Banner/Banner3";
import Contact from "./Contact";
import Mobiles from "./Mobiles/Mobiles";
import Reviews from "./Mobiles/Reviews";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <Banner1 />
      <Banner2 />
      <Mobiles />
      <Banner3 />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
