import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorRegisterForm from "../../components/doctor-components/DoctorRegisterForm";
import dayjs from "dayjs";

function Doctor_Update() {
  const params = useParams();
  const { _id } = params;

  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const onChangeFile = (e) => {
    setPhoto(e.target.files[0]);
  };

  //handle form
  const handleRegister = async (values) => {
    try {
      const res = await axios.post(
        "/api/doctor/updateDoctorInfo",
        {
          ...values,
          doctorId: doctor._id,
          timings: [
            dayjs(values.timings[0]).format("HH:mm"),
            dayjs(values.timings[1]).format("HH:mm"),
          ],
          photo: photo,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        message.success("Account Updated Successfully");
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Somthing Went Wrong in Update");
    }
  };

  //get Doctor Data
  const getDoctorData = async () => {
    try {
      const res = await axios.get(`/api/doctor/getDoctorInfoById/${_id}`);
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete Doctor
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/doctor/deleteDoctorProfile/${id}`);
      navigate("/");
      message.success("Account Deleted");
    } catch (error) {
      console.log(error);
      message.error("Somthing Went Wrong in Delete");
      navigate("/");
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <div>
      <h4 className="my-5 primary-text">Doctor Profile Update</h4>
      {doctor && (
        <DoctorRegisterForm
          handleRegister={handleRegister}
          onChangeFile={onChangeFile}
          initialValues={doctor}
        />
      )}

      {doctor && (
        <button
          style={{
            marginLeft: 1200,
            color: "#ffffff",
            backgroundColor: "red",
            fontFamily: "Quicksand",
            fontSize: 20,
            fontWeight: "bold",
          }}
          className="btn btn-danger form-btn"
          type="submit"
          onClick={() => handleDelete(doctor._id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default Doctor_Update;
