import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Statistic,
  Table,
  message,
} from "antd";
import dayjs from "dayjs";
import { Store } from "../../components/Online-shopping-components/Store";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
  DownloadOutlined,
} from "@ant-design/icons";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import logoImage from "./logo.png";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //to fetch doctor data
  const getAppointmentsData = async () => {
    try {
      const response = await axios.get(
        `/api/doctor/getAppointmentsByDoctorId/${userInfo._id}`
      );

      if (response.data.success) {
        setAppointments(response.data.data);
        setFilteredAppointments(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to change status to doctor
  const changeAppointmentStatus = async (record, status) => {
    try {
      const response = await axios.post("/api/doctor/changeAppointmentStatus", {
        appointmentId: record._id,
        status: status,
      });
      if (response.data.success) {
        message.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      message.error("Error changing status to Doctor");
      console.log(error);
    }
  };

  // function to download table as CSV
  const downloadCSV = () => {
    const csvData = [
      ["FlexFitness - Doctor Management Report"],
      ["                                                  "],
      ["Doctor Name: " + userInfo.name],
      ["Doctor Email: " + userInfo.email],
      ["                                                  "],
      ["Patient", "Phone Number", "Date & Time", "Status"],
      ...appointments.map((appointment) => ({
        Patient: appointment.userDes.name,
        Phone: appointment.doctorInfo.phone,
        "Date & Time": `${dayjs(appointment.date).format("DD-MM-YYYY")} ${dayjs(
          appointment.time
        ).format("HH:mm")}`,
        Status: appointment.status,
      })),
      ["                                                  "],
      [`Total Appointments: ${appointments.length}`],
      [`Approved Appointments: ${approved}`],
      [`Pending Appointments: ${pending}`],
      [`Rejected Appointments: ${approved}`],
      [
        "                                                                                           ",
      ],
      [`Generated at ${dayjs().format("DD-MM-YYYY HH:mm")}`],
      ["All Rights Reserved - FlexFitness"],
    ];

    const headers = Object.keys(csvData[0]).join(",");
    const rows = csvData.map((data) => Object.values(data).join(","));
    const csvContent = `${headers}\n${rows.join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "Appointments.csv";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // DOWNLOAD PDF
  // function to download table as PDF
  const handleDownloadPDF = async () => {
    let filteredAppointments = appointments;

    if (selectedDay) {
      const selectedMonth = dayjs(selectedDay).month();
      filteredAppointments = appointments.filter((appointment) => {
        const appointmentMonth = dayjs(appointment.date).month();
        return appointmentMonth === selectedMonth;
      });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();

    const headerText =
      "                                        FlexFitness - Doctor Appointment Report";
    const doctorNameText = `Doctor Name: ${userInfo.name}`;
    const doctorEmailText = `Doctor Email: ${userInfo.email}`;
    const totalText = `Total Appointments: ${appointments.length}`;
    const approvedText = `Approved Appointments: ${approved}`;
    const pendingText = `Pending Appointments: ${pending}`;
    const rejectedText = `Rejected Appointments: ${rejected}`;
    const generatedText = `                                               Generated at ${dayjs().format(
      "DD-MM-YYYY HH:mm"
    )}`;
    const rightsText =
      "                                              All Rights Reserved - FlexFitness";

    const textArray = [
      headerText,
      "",
      doctorNameText,
      doctorEmailText,
      "",
      totalText,
      approvedText,
      pendingText,
      rejectedText,
      "",
      "--------------------------------------------------------------------------------------------------------------------------",
      ["Patient", "Phone Number", "Date & Time", "Status"],
      "--------------------------------------------------------------------------------------------------------------------------",
      ...filteredAppointments.map((appointment) => {
        return [
          appointment.userDes.name,
          appointment.doctorInfo.phone,
          `${dayjs(appointment.date).format("DD-MM-YYYY")} ${dayjs(
            appointment.time
          ).format("HH:mm")}`,
          appointment.status,
        ];
      }),
      "",
      "",
      "",
      generatedText,
      rightsText,
    ];

    const fontSize = 12;
    const textHeight = fontSize * 1.2;
    const margin = 50;
    const yStart = height - margin - textHeight;

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y) => {
      page.drawText(text, { x, y, size: fontSize, font });
    };

    for (let i = 0; i < textArray.length; i++) {
      const line = textArray[i];
      let x = margin;
      let y = yStart - i * textHeight;

      if (line instanceof Array) {
        for (let j = 0; j < line.length; j++) {
          drawText(line[j], x + j * (width / 4), y);
        }
      } else {
        drawText(line, x, y);
      }
    }

    // Add logo image to top center of page
    const logo = await fetch(logoImage).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(logo);
    const logoWidth = 170;
    const logoHeight = 30;
    const logoX = (width - logoWidth) / 2;
    const logoY = height - margin;
    page.drawImage(pngImage, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "Appointments.pdf";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //use effect function to get appointments data
  useEffect(() => {
    getAppointmentsData();
  }, []);

  useEffect(() => {
    if (selectedDay) {
      const filtered = appointments.filter((appointment) =>
        dayjs(appointment.date).isSame(selectedDay, "day")
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [selectedDay, appointments]);

  const approved = appointments.filter(
    (appointment) => appointment.status === "approve"
  ).length;
  const rejected = appointments.filter(
    (appointment) => appointment.status === "reject"
  ).length;
  const pending = appointments.filter(
    (appointment) => appointment.status === "pending"
  ).length;

  // antD table col
  const columns = [
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userDes.name}</span>,
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
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success mx-2"
                onClick={() => changeAppointmentStatus(record, "approve")}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() => changeAppointmentStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleDateChange = (date, dateString) => {
    setSelectedDay(dateString);
  };

  return (
    <div className="m-5 p-3 border shadow rounded">
      <h4 className="my-5 primary-text">Scheduled Appointments</h4>

      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Accepted"
              value={approved}
              precision={0}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              suffix="Appointments"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Rejected"
              value={rejected}
              precision={0}
              valueStyle={{
                color: "#eb2f96",
              }}
              prefix={<CloseCircleTwoTone twoToneColor="#eb2f96" />}
              suffix="Appointments"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Pending"
              value={pending}
              precision={0}
              valueStyle={{
                color: "#FCA510",
              }}
              prefix={<ExclamationCircleTwoTone twoToneColor="#FCA510" />}
              suffix="Appointments"
            />
          </Card>
        </Col>
      </Row>

      <DatePicker
        onChange={handleDateChange}
        style={{
          marginTop: 50,
          height: 50,
          width: 500,
          fontFamily: "Quicksand",
          fontSize: 25,
        }}
      />

      <Table
        className="mt-5"
        bordered={true}
        columns={columns}
        dataSource={filteredAppointments}
      />

      <Button
        onClick={handleDownloadPDF}
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
        style={{
          marginTop: 20,
          marginLeft: 10,
          marginBottom: 10,
          backgroundColor: "green",
          fontFamily: "Quicksand",
        }}
      >
        Generate Report
      </Button>
    </div>
  );
}

export default DoctorAppointments;
