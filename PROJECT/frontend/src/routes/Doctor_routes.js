import React from "react";
import { Route, Routes } from "react-router-dom";
import Doctor_home from "../pages/doctor_pages/Doctor_home";
import Doctor_Register from "../pages/doctor_pages/Doctor_Register";
import BookAppointment from "../pages/doctor_pages/BookAppointment";
// import AppointmentCharts from "../pages/doctor_pages/AppointmentCharts";



export default function Doctor_routes() {
  return (
    <Routes>
      <Route path="/doctor_home" element={<Doctor_home />} />
      <Route path="/Doctor_register" element={<Doctor_Register />} />
      <Route path="/bookAppointment/:doctorId" element={<BookAppointment />} />
      {/* <Route path="/Doctor_dashboard" element={<AppointmentCharts />} /> */}

    </Routes>
  );
}
