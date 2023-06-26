import { DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../../components/Online-shopping-components/Store";
import { useContext } from "react";

function BookAppointment() {
  const params = useParams();
  const [doctors, setDoctors] = useState();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const getDoctorData = async () => {
    try {
      const res = await axios.get(
        `/api/doctor/getDoctorInfoById/${params.doctorId}`,
        { doctorId: params.doctorId }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =============== booking function =====================
  const handleBooking = async () => {
    setIsAvailable(false); //--
    try {
      const res = await axios.post(
        "/api/doctor/bookAppointmentByUser", //change to user
        {
          doctorId: params.doctorId,
          userId: userInfo._id,
          doctorInfo: doctors,
          userDes: userInfo,
          date: date,
          time: time,
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==================== handle availability ===========================
  const handleAvailability = async () => {
    try {
      const res = await axios.post("/api/doctor/checkBookingAvailability", {
        doctorId: params.doctorId,
        date: date,
        time: time,
      });
      if (res.data.success) {
        message.success(res.data.message);
        setIsAvailable(true);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < dayjs().startOf("day");
  };

  useEffect(() => {
    getDoctorData();
    console.log("getDoctorData()");
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <p className="primary-text">
        <b>Book Your Appointment</b>
      </p>
      <div className="container m-2 p-4 border shadow rounded">
        {doctors && (
          <div className="d-flex flex-row mb-5">
            <div className="ms-5">
              <h4 className="my-5 primary-text">
                <b>
                  Dr. {doctors.name} <br></br> ({doctors.designation}){" "}
                </b>
              </h4>
              <img
                src={`${doctors.photo}`}
                width="80%"
                height="20%"
                className="mt-5"
                alt="doctor"
              />
            </div>
            <div className=" container" style={{ marginTop: "100px" }}>
              <h5 className="my-2" style={{ fontSize: "16pt" }}>
                Specialization : {doctors.specialization}
              </h5>
              <h5 className="my-2" style={{ fontSize: "16pt" }}>
                Email : {doctors.email}
              </h5>
              <h5 className="my-2" style={{ fontSize: "16pt" }}>
                Phone : {doctors.phone}
              </h5>
              <h5 className="my-2" style={{ fontSize: "16pt" }}>
                Experience : {doctors.experience} years
              </h5>
              <h5 className="my-2" style={{ fontSize: "16pt" }}>
                Timings : {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h5>

              <div className="d-flex flex-column ">
                <DatePicker
                  aria-required={"true"}
                  className="my-2"
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(dayjs(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                  size="large"
                  disabledDate={disabledDate}
                />
                <TimePicker
                  aria-required={"true"}
                  format="HH:mm"
                  className="mb-2"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setTime(dayjs(value).format("HH:mm"));
                    setIsAvailable(false);
                  }}
                  size="large"
                  disabled={date ? false : true}
                />

                {!isAvailable && (
                  <button
                    className="btn btn-primary mt-5 btn-lg"
                    onClick={handleAvailability}
                  >
                    Check Availability
                  </button>
                )}

                {isAvailable && (
                  <button
                    className="btn btn-dark mt-5 btn-lg"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;
