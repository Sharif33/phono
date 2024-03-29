import * as React from "react";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import MakeAdmin from "./Dashboard/Admin/MakeAdmin";
import MyOrders from "./Dashboard/User/MyOrders";
import DashboardHome from "./Dashboard/Dashboard/DashboardHome";
import Review from "./Dashboard/User/Review";
import Payment from "./Dashboard/User/Payment";
// import BuyMobile from "./Pages/Home/Mobiles/BuyMobile";
import MyOrderDetails from "./Dashboard/User/MyOrderDetails";
import SearchField from "./Pages/Home/Search/SearchField";
import NotFound from "./Shared/NotFound";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer } from 'react-toastify';
import BuyNow from "./Pages/Home/Mobiles/BuyNow";
import ManageOrder from "./Dashboard/Admin/HandleOrders/ManageOrder";
import AddMobile from "./Dashboard/Admin/HandleProducts/AddMobile";
import AddOffers from "./Dashboard/Admin/HandleOffers/AddOffers";
import ManageProducts from "./Dashboard/Admin/HandleProducts/ManageProducts";
import EditOffer from "./Dashboard/Admin/HandleOffers/EditOffer";
import ManageUsers from "./Dashboard/Admin/HandleCustomers/ManageUsers";
import ManageOffers from "./Dashboard/Admin/HandleOffers/ManageOffers";
import UserDetails from "./Dashboard/User/UserDetails";
import EditMobile from "./Dashboard/Admin/HandleProducts/EditMobile";
import Cart from "./Pages/Home/Cart/Cart";
import Compare from "./Pages/Home/Cart/Compare";
import Favourite from "./Pages/Home/Cart/Favourite";
import SpecialDetails from "./Pages/Home/Offers/SpecialDetails";
import PlaceOrder from "./Pages/Home/Cart/PlaceOrder";
import ShippingAddress from "./Dashboard/User/Addresses/ShippingAddress";
// import { handelRightClick } from "./Shared/RightClick";

function App() {
  // document.addEventListener('contextmenu', handelRightClick);
  const [spinner, setSpinner] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setSpinner(false), 1500)
  }, []);
  return (
    <div>
      {
        spinner ? <div className="loader m-auto">
          <div>
            <CircularProgress />
            {/* <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_8sjqrjby.json" background="transparent" speed="1" style={{ width: "10vw" }} loop autoplay></lottie-player> */}
          </div>
        </div> :
          <AuthProvider>
            <ToastContainer />
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
              <Route path="fvrt" element={<Favourite />} />
              <Route path="mobiles" element={<ExploreMobiles />} />
              <Route path="mobile/:id" element={<SingleMobile />} />
              <Route path="mobile2/:id" element={<SpecialDetails />} />
              <Route path="placeOrder" element={<PrivateRoute>
                <PlaceOrder />
              </PrivateRoute>} />
              <Route path="buy/placeOrder" element={<PrivateRoute>
                <BuyNow />
              </PrivateRoute>} />
              <Route path={`/user/:id`} element={<PrivateRoute>
                <ShippingAddress />
              </PrivateRoute>}>
              </Route>

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
                  <AddOffers />
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
                  <ManageOffers />
                </AdminRoute>}>
                </Route>
                <Route path={`manageOffers/:id`} element={<AdminRoute>
                  <EditOffer />
                </AdminRoute>}>
                </Route>
                <Route path={`/dashboard/manageUsers`} element={<AdminRoute>
                  <ManageUsers />
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
