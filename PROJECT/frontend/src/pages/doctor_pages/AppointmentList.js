import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from "antd";
import dayjs from "dayjs";
import { Store } from "../../components/Online-shopping-components/Store";
// import "../../components/doctor-components/DoctorForm.css";


function AppointmentList() {
  const [appointment, setAppointment] = useState();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  //to fetch doctor data
  const getAppointmentData = async () => {
    try {

      const response = await axios.get(`/api/doctor/getAppointmentsByUserId/${userInfo._id}`, {
        
      });

      if (response.data.success) {
        setAppointment(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (record) => {
    try {
      const response = await axios.delete(
        `/api/doctor/deleteAppointmentsByUserId/${record._id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
      }
    } catch (error) {
      message.error("Error deleting appointment");
      console.log(error);
    }

  }


  useEffect(() => {
    getAppointmentData();
  }, []);

  // antD table col
  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "_id",
    // },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.name}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {dayjs(record.date).format("DD-MM-YYYY")}{" "}
          {dayjs(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span style={{ color: text === "approve" ? "green" : text === "reject" ? "red" : "black" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status !== "approve" && record.status !== "reject" && (
            <div className="d-flex">
              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteAppointment(record)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <h4 className="my-5 primary-text">My Appointments</h4>
      <Table className="shadow" style={{color: "black", marginBottom: 200}} bordered={true} columns={columns} dataSource={appointment} />
    </div>
  );
}

export default AppointmentList;
