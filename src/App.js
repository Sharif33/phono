import * as React from "react";
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import ContactUs from "./Pages/Home/ContactUs";
import AboutUs from "./Pages/Home/AboutUs";
import Header from "./Shared/Header/Header";
import LogIn from "./LogIn/LogIn/LogIn";
import Register from "./LogIn/Register/Register";
import ExploreMobiles from "./Pages/Home/Mobiles/ExploreMobiles";
import PrivateRoute from "./LogIn/PrivateRoute/PrivateRoute";
import SingleMobile from "./Pages/Home/Mobiles/SingleMobile";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider";


function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="mobiles" element={<ExploreMobiles />} />
          <Route path="mobile/:id" element={<PrivateRoute>
            <SingleMobile />
          </PrivateRoute>} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
