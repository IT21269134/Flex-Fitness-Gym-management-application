import React from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";

//homepage import
import "../pages/homepage/homepage.css";
import Home from "../pages/homepage/Home";


//Customer pages
import Customer_home from "../pages/customer_pages/Customer_home";
// import AddUser from "../pages/customer_pages/AddUser";
// import RegisterForm from "../pages/customer_pages/RegisterForm";

//import animatePresence
import { AnimatePresence } from "framer-motion";

//import customer components
import Customer_Login from "../components/customer-components/Customer_Login";
import Customer_Password from "../components/customer-components/Customer_Password";
import Customer_Profile from "../components/customer-components/Customer_Profile";
import Customer_Recovery from "../components/customer-components/Customer_Recovery";
import Customer_Register from "../components/customer-components/Customer_Register";
import Customer_Reset from "../components/customer-components/Customer_Reset";
import Customer_Dashboard from "../components/customer-components/Customer_Dashboard";
import PageNotFound from "../components/customer-components/PageNotFound";

// auth middleware
import {
  AuthorizeUser,
  ProtectRoute,
} from "../components/customer-components/customerAuth";

export default function Customer_routes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes>
        {/* Customer pages routes */}
        <Route path="/customer_home" element={<Customer_home />} />,
        {/* new routes */}
       
        <Route
          exact
          path="/Customer_Register"
          element={<Customer_Register />}
        />
        ,
        <Route
          exact
          path="/Customer_Dashboard"
          element={<Customer_Dashboard />}
        />,
        <Route exact path="/Customer_Login" element={<Customer_Login />} />,
        <Route
          exact
          path="/Customer_Password"
          element={
            <ProtectRoute>
              <Customer_Password />
            </ProtectRoute>
          }
        />
        ,
        <Route
          exact
          path="/Customer_Profile"
          element={
            <AuthorizeUser>
              <Customer_Profile />
            </AuthorizeUser>
          }
        />
        ,
        <Route
          exact
          path="/Customer_Recovery"
          element={<Customer_Recovery />}
        />
        ,
        <Route exact path="/Customer_Reset" element={<Customer_Reset />} />,
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

//   //animation + routes
