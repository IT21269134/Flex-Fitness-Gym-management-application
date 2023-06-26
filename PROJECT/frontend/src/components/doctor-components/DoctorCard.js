import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  // set border color based on doctor's designation
  let borderColor;
  switch (doctor.designation) {
    case "Psychiatrist":
      borderColor = "yellow";
      break;
    case "Chiropractor":
      borderColor = "blue";
      break;
    case "Sports Medicine Specialist":
      borderColor = "orange";
      break;
    case "Osteopathic physicians":
      borderColor = "green";
      break;
    case "Orthopedic Surgeon":
      borderColor = "red";
      break;
    default:
      borderColor = "gray";
  }

  return (
    <Card
      className="shadow-lg rounded"
      style={{
        display: "flex",
        width: "23rem",
        height: "17rem",
        margin: "2rem",
        cursor: "pointer",
        border: `2px solid ${borderColor}`,
      }}
      onClick={() => navigate(`/bookAppointment/${doctor._id}`)}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginRight: "1rem",
            marginTop: "2rem",
          }}
        >
          <img src={`${doctor.photo}`} alt="doctorImg" width="150px" height= "150px" />
        </div>
        <div style={{fontFamily: 'Quicksand'}}>
          <Card.Meta
            title={
              <h5 style={{ fontSize: 20, color: "green" }}>{doctor.name}</h5>
            }
            description={
              <div style={{ fontSize: 16, color: "black" }}>
                <p className="my-2">
                  <b>Designation: </b> <br></br> {doctor.designation}
                </p>
                <p className="my-2">
                  <b>Phone Number: </b> <br></br> {doctor.phone}
                </p>
                <p>
                  <b>Timings: </b> <br></br> {doctor.timings[0]} -{" "}
                  {doctor.timings[1]}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

export default DoctorCard;
