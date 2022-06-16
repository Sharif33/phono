import * as React from "react";
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import ContactUs from "./Pages/Home/ContactUs";
import AboutUs from "./Pages/Home/AboutUs";
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
import Payment from "./Dashboard/User/Payment";
// import BuyMobile from "./Pages/Home/Mobiles/BuyMobile";
import EditMobile from "./Dashboard/Admin/EditMobile";
import Cart from "./Pages/Home/Mobiles/Cart";
import Favourite from "./Pages/Home/Mobiles/Favourite";
import PlaceOrder from "./Pages/Home/Mobiles/PlaceOrder";
import MyOrderDetails from "./Dashboard/User/MyOrderDetails";
import Compare from "./Pages/Home/Mobiles/Compare";
import SpecialDetails from "./Pages/Home/Mobiles/SpecialDetails";
import SearchField from "./Pages/Home/Search/SearchField";
import UserDetails from "./Dashboard/User/UserDetails";
import EditUser from "./Dashboard/User/EditUser";
import { handelRightClick } from "./Shared/RightClick";
import ManageUsers from "./Dashboard/Admin/ManageUsers";
import AddOffers from "./Dashboard/Admin/AddOffers";
import ManageOffers from "./Dashboard/Admin/ManageOffers";
import EditOffer from "./Dashboard/Admin/EditOffer";
import NotFound from "./Shared/NotFound";


function App() {
  document.addEventListener('contextmenu', handelRightClick);
  const [spinner, setSpinner] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setSpinner(false), 1500)
  }, []);
  return (
    <div>
      {
        spinner ? <div className="loader">
          <div>
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_cyrvih26.json" background="transparent" speed="1" style={{ width: "20rem" }} loop autoplay></lottie-player>
          </div>
          <div>
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_8sjqrjby.json" background="transparent" speed="1" style={{ width: "20rem" }} loop autoplay></lottie-player>
          </div>
        </div> : 
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="search" element={<SearchField />} />
            <Route path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="compare" element={<Compare />} />
            <Route path="placeOrder" element={<PrivateRoute>
              <PlaceOrder />
            </PrivateRoute>} />
            <Route path="fvrt" element={<Favourite />} />
            <Route path="mobiles" element={<ExploreMobiles />} />
            <Route path="mobile/:id" element={<PrivateRoute>
              <SingleMobile />
            </PrivateRoute>} />
            <Route path="mobile2/:id" element={<PrivateRoute>
              <SpecialDetails />
            </PrivateRoute>} />
            <Route path="dashboard" element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>}>
              <Route path={`/dashboard/myOrders`} element={<PrivateRoute>
                <MyOrders></MyOrders>
              </PrivateRoute>}>

                <Route path={`/dashboard/myOrders/:id`} element={<PrivateRoute>
                  <MyOrderDetails></MyOrderDetails>
                </PrivateRoute>}>
                </Route>
              </Route>

              <Route path={`/dashboard/pay/:id`} element={<PrivateRoute>
                <Payment></Payment>
              </PrivateRoute>}>
              </Route>
              <Route path={`user`} element={<PrivateRoute>
                <UserDetails />
              </PrivateRoute>}>
              </Route>
              <Route path={`/dashboard/user/:id`} element={<PrivateRoute>
                <EditUser />
              </PrivateRoute>}>
              </Route>
              <Route path={`/dashboard/review`} element={<PrivateRoute>
                <Review></Review>
              </PrivateRoute>}>
              </Route>
              <Route index element={<PrivateRoute>
                <DashboardHome></DashboardHome>
              </PrivateRoute>} />
              <Route path={`/dashboard/manageOrder`} element={<AdminRoute>
                <ManageOrder></ManageOrder>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute>
                <MakeAdmin></MakeAdmin>
              </AdminRoute>}>
              </Route>
              <Route path={`addMobile`} element={<AdminRoute>
                <AddMobile></AddMobile>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/addOffer`} element={<AdminRoute>
                <AddOffers/>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/manageProducts/:id`} element={<AdminRoute>
                <EditMobile></EditMobile>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/manageProducts`} element={<AdminRoute>
                <ManageProducts></ManageProducts>
              </AdminRoute>}>
              </Route>
              <Route path={`manageOffers`} element={<AdminRoute>
                <ManageOffers/>
              </AdminRoute>}>
              </Route>
              <Route path={`manageOffers/:id`} element={<AdminRoute>
                <EditOffer/>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/manageUsers`} element={<AdminRoute>
                <ManageUsers/>
              </AdminRoute>}>
              </Route>
            </Route>
          </Routes>
        </AuthProvider>

      }

    </div>
  );
}

export default App;
