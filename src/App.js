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
import Dashboard from "./Dashboard/Dashboard/Dashboard";
import AdminRoute from "./Dashboard/Admin/AdminRoute";
import AddMobile from "./Dashboard/Admin/AddMobile";
import MakeAdmin from "./Dashboard/Admin/MakeAdmin";
import ManageProducts from "./Dashboard/Admin/ManageProducts";
import ManageOrder from "./Dashboard/Admin/ManageOrder";
import MyOrders from "./Dashboard/User/MyOrders";
import DashboardHome from "./Dashboard/Dashboard/DashboardHome";
import Review from "./Dashboard/User/Review";


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
          <Route path="dashboard" element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>}>
            <Route path={`/dashboard/myOrders`} element={<PrivateRoute>
               <MyOrders></MyOrders>
              </PrivateRoute>}>
              </Route>
            <Route path={`/dashboard/review`} element={<PrivateRoute>
               <Review></Review>
              </PrivateRoute>}>
              </Route>
              <Route path="dashboard/*" element={<PrivateRoute>
                <DashboardHome></DashboardHome>
              </PrivateRoute>}>
              </Route>
              <Route path={`/dashboard/manageOrder`} element={<AdminRoute>
                <ManageOrder></ManageOrder>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute>
                <MakeAdmin></MakeAdmin>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/addMobile`} element={<AdminRoute>
                <AddMobile></AddMobile>
              </AdminRoute>}>
                </Route>
              <Route path={`/dashboard/manageProducts`} element={<AdminRoute>
                <ManageProducts></ManageProducts>
              </AdminRoute>}>
              </Route>
            </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
