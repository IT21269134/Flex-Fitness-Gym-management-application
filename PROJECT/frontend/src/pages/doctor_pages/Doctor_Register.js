import React, { useState } from "react";
import axios from "axios";
import DoctorRegisterForm from "../../components/doctor-components/DoctorRegisterForm";
import { useNavigate } from "react-router-dom";
// import moment from "moment";
import { message } from "antd";
import dayjs from "dayjs";

function Doctor_Register() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const onChangeFile = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleRegister = async (values) => {
    try {
      const timings = [
        dayjs(values.timings[0]).format("HH:mm"),
        dayjs(values.timings[1]).format("HH:mm"),
      ];
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("photo", photo);
      formData.append("specialization", values.specialization);
      formData.append("designation", values.designation);
      formData.append("experience", values.experience);
      formData.append("timings", timings[0]);
      formData.append("timings", timings[1]);

      const res = await axios.post(
        "/api/doctor/register_doctor",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        { timings }
      );
      console.log(res);
      if (res.data.success) {
        message.success("Doctor Registration Successful");
        navigate("/dashboard/app");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Doctor Registration Failed");
    }
  };
  return (
    <div>
      <h4 className="my-5 primary-text">Doctor Registration</h4>
      <DoctorRegisterForm
        handleRegister={handleRegister}
        onChangeFile={onChangeFile}
      />
    </div>
  );
}

export default Doctor_Register;
