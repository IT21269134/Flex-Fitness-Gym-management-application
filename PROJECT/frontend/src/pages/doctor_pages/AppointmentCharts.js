import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function AppointmentCharts() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // code to fetch appointments
        const fetchAppointments = async () => {
          try {
            const response = await axios.get("/api/doctor/getAppointmentsByDoctorId/");
            setAppointments(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchAppointments();
      }, []);


    
    //   const approvedAppointments = appointments.filter(
    //     (appointment) => appointment.status === 'approved'
    //   );
    //   const rejectedAppointments = appointments.filter(
    //     (appointment) => appointment.status === 'rejected'
    //   );
    //   const pendingAppointments = appointments.filter(
    //     (appointment) => appointment.status === 'pending'
    //   );

    // check if appointments is an array
  if (!Array.isArray(appointments)) {
    return <div>No appointments found</div>;
  }

  const approved = appointments.filter((appointment) => appointment.status === 'approved').length;
  const rejected = appointments.filter((appointment) => appointment.status === 'rejected').length;
  const pending = appointments.filter((appointment) => appointment.status === 'pending').length;


  return (
    // <div>
    //   <h2>Appointment Charts</h2>
    //   <p>Approved: {approvedAppointments.length}</p>
    //   <p>Rejected: {rejectedAppointments.length}</p>
    //   <p>Pending: {pendingAppointments.length}</p>
    // </div>
    <div>
      <h2>Appointment Charts</h2>
      <p>Approved: {approved}</p>
      <p>Rejected: {rejected}</p>
      <p>Pending: {pending}</p>
    </div>
  );
  
}

export default AppointmentCharts;
