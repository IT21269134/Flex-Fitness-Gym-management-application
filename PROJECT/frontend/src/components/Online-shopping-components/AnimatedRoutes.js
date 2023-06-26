import React from "react";
import { useLocation, Routes, Route, useRoutes } from "react-router-dom";
import OrderList from "../../pages/Shop_pages/OrderList";
import CartScreen from "../../pages/Shop_pages/CartScreen";
import Category from "./Category";
import CoachScreen from "../../pages/Shop_pages/CoachScreen";
import CreateProduct from "../../pages/Shop_pages/CreateProduct";
import Home from "../../pages/Shop_pages/Home";
import Product from "../../pages/Shop_pages/Product";
import ProductListScreen from "../../pages/Shop_pages/ProductListScreen";
import AdminDashBoard from "../../pages/Shop_pages/AdminDashBoard";
import ProtectedRoutes from "./ProtectedRoutes";
import Search from "./Search";
import SearchScreen from "../../pages/Shop_pages/AdminDashBoard";
import SigninScreen from "../../pages/Shop_pages/SigninScreen";
import UpdateProduct from "../../pages/Shop_pages/UpdateProduct";
import { AnimatePresence } from "framer-motion";
import AddCoach from "./AddCoach";
import Signout from "./Signout";
import Shipping from "./Shipping";
import Homes from "../../pages/homepage/Home";
import Doctor_home from "../../pages/doctor_pages/Doctor_home";
import Doctor_Register from "../../pages/doctor_pages/Doctor_Register";
import BookAppointment from "../../pages/doctor_pages/BookAppointment";
import Inventory_home from "../../pages/inventory_mgt/Inventory_home";
import Doctor_Update from "../../pages/doctor_pages/Doctor_Update";
import AppointmentList from "../../pages/doctor_pages/AppointmentList";
import DoctorAppointments from "../../pages/doctor_pages/DoctorAppointments";
import Trainer_home from "../../pages/trainer_pages/Trainer_home";
import TrainerAD from "../../pages/trainer_pages/Traner_ads";
import Dashboardfunction from "../../pages/trainer_pages/Trainer_Dashboard";
import WorkoutPage from "../../pages/trainer_pages/TrainerWokouts";
import Fitness_home from "../../pages/fitness_pages/Fitness_home";
import Fitness_log from "../../pages/fitness_pages/Fitness_log";
import Fitness_LogD from "../../pages/fitness_pages/Fitness_LogD";
import UpdateFitnessGoal from "../../pages/fitness_pages/UpdateFitnessGoal";
import WorkoutPageUser from "../../pages/fitness_pages/WorkoutPageUser";
import ProcessPayment from "../../pages/Payment_pages/PaymentProcess";
import ProductList from "../../pages/Shop_pages/ProductList";
// pathum

import Nutrition_home from "../../pages/nutrition_pages/Nutrition_home";

import Breakfast from "../../components/nutrition-components/Breakfirst";
import Lunch from "../../components/nutrition-components/Lunch";
import Dinner from "../../components/nutrition-components/Dinner";
import AddNewBreakfast from "../../components/nutrition-components/AddNewBreakfast";
import AddNewLunch from "../../components/nutrition-components/AddNewLunch";
import AddNewDinner from "../../components/nutrition-components/AddNewDinner";
import AnalysisBreak from "../../components/nutrition-components/AnalysisBreak";
import AnalysisLunch from "../../components/nutrition-components/AnalysisLunch";
import AnalysisDinner from "../../components/nutrition-components/AnalysisDinner";

// harini

//homepage import

//Customer pages
import Customer_home from "../../pages/customer_pages/Customer_home";

//import animatePresence

//import customer components
import Customer_Login from "../../components/customer-components/Customer_Login";
import Customer_Password from "../../components/customer-components/Customer_Password";
import Customer_Profile from "../../components/customer-components/Customer_Profile";
import Customer_Recovery from "../../components/customer-components/Customer_Recovery";
import Customer_Register from "../../components/customer-components/Customer_Register";
import Customer_Reset from "../../components/customer-components/Customer_Reset";
import Customer_Dashboard from "../../components/customer-components/Customer_Dashboard";
import PageNotFound from "../../components/customer-components/PageNotFound";
// layouts
import DashboardLayout from "../../components/Online-shopping-components/layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import ExpenseDashboard from "../Online-shopping-components/pages/ExpenseDashboard";
// auth middleware
import {
  AuthorizeUser,
  ProtectRoute,
} from "../../components/customer-components/customerAuth";
import DashboardAppPage from "./pages/DashboardAppPage";
import Review from "../../pages/Payment_pages/Review";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/shophome" element={<Home />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminDashBoard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/productList"
          element={
            <ProtectedRoutes>
              <ProductList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/coach"
          element={
            <ProtectedRoutes>
              <CoachScreen />
            </ProtectedRoutes>
          }
        />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/addCoach" element={<AddCoach />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/Category/:category" element={<Category />} />
        <Route path="/signup" element={<Signout />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="/doctor_home" element={<Doctor_home />} />
        <Route path="/Doctor_register" element={<Doctor_Register />} />
        <Route
          path="/bookAppointment/:doctorId"
          element={<BookAppointment />}
        />
        <Route path="/updateDoctorInfo/:_id" element={<Doctor_Update />} />
        <Route path="/inventory_home" element={<Inventory_home />} />
        <Route
          path="/myDoctor_appointments/:_id"
          element={<AppointmentList />}
        />
        <Route
          path="/Doctor_appointmentsList"
          element={<DoctorAppointments />}
        />
        <Route path="/trainer_home" element={<Trainer_home />} />
        <Route path="/trainerAD" element={<TrainerAD />} />
        <Route path="/dash" element={<Dashboardfunction />} />
        <Route path="/wpage" element={<WorkoutPage />} />
        <Route
          path="/fitness_home/:_id"
          element={<Fitness_home userID="A1" />}
        />
        <Route path="/fitness_goals" element={<Fitness_log />} />
        <Route path="/fitness_log" element={<Fitness_LogD />} />
        <Route path="/updateFitness_goals" element={<UpdateFitnessGoal />} />
        <Route path="/workout_log" element={<WorkoutPageUser />} />
        <Route path="/payment_" element={<ProcessPayment />} />
        <Route path="/reviewss" element={<Review />} />
        <Route path="/paymenttt" element={<ExpenseDashboard />} />
        {/* pathum*/}
        <Route exact path="/nutrition_home" element={<Nutrition_home />} />
        <Route exact path="/breakfast" element={<Breakfast />}></Route>
        <Route
          exact
          path="/breakfast/addnewdiary"
          element={<AddNewBreakfast />}
        ></Route>
        <Route
          exact
          path="/breakfast/viewanalysis"
          element={<AnalysisBreak />}
        ></Route>
        <Route exact path="/lunch" element={<Lunch />}></Route>
        <Route
          exact
          path="/lunch/addnewdiary"
          element={<AddNewLunch />}
        ></Route>
        <Route
          exact
          path="/lunch/viewanalysis"
          element={<AnalysisLunch />}
        ></Route>
        <Route exact path="/dinner" element={<Dinner />}></Route>
        <Route
          exact
          path="/dinner/addnewdiary"
          element={<AddNewDinner />}
        ></Route>
        <Route
          exact
          path="/dinner/viewanalysis"
          element={<AnalysisDinner />}
        ></Route>
        <Route exact path="/paymentt" element={<ExpenseDashboard />}></Route>
        <Route path="/inventory_home" element={<Inventory_home />} />
        harini
        {/* Customer pages routes */}
        {/* Customer pages routes */}
        <Route path="/customer_home" element={<Customer_home />} />,
        {/* new routes */}
        <Route path="/Customer_Register" element={<Customer_Register />} />
        ,
        <Route path="/Customer_Dashboard" element={<Customer_Dashboard />} />
        ,
        <Route path="/Customer_Login" element={<Customer_Login />} />,
        <Route path="/Customer_Password" element={<Customer_Password />} />
        ,
        <Route
          path="/Customer_Profile"
          element={
            <AuthorizeUser>
              <Customer_Profile />
            </AuthorizeUser>
          }
        />
        ,
        <Route path="/Customer_Recovery" element={<Customer_Recovery />} />
        ,
        <Route path="/Customer_Reset" element={<Customer_Reset />} />
        ,
        <Route path="*" element={<PageNotFound />} />
        {/* Customer admin pages routes */}
        <Route path="/cusAdminHeader" element={<cusAdminHeader />} />
        ,
        <Route path="/cusAdminHome" element={<cusAdminHome />} />,
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
