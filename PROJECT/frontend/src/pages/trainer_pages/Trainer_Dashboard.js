import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./TrainerReg.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Store } from "../../components/Online-shopping-components/Store";
import styled from "styled-components";
import { message } from "antd";

//Create Trainer
const Dashboardfunction = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [username, setUsername] = useState("");
  const [coachername, setCoachername] = useState(userInfo.name);
  const [sheduleno, setsheduleno] = useState("");
  const [date, setDate] = useState("");
  const [set1, setset1] = useState("");
  const [set2, setset2] = useState("");
  const [set3, setset3] = useState("");
  const [set4, setset4] = useState("");
  const [set5, setset5] = useState("");
  const [set6, setset6] = useState("");
  const [set7, setset7] = useState("");
  const [set8, setset8] = useState("");
  const [set9, setset9] = useState("");
  const [set10, setset10] = useState("");
  function sendData(e) {
    //prevent normal behaviour
    e.preventDefault();

    const newWorkout = {
      username,
      coachername,
      sheduleno,
      date,
      set1,
      set2,
      set3,
      set4,
      set5,
      set6,
      set7,
      set8,
      set9,
      set10,
    };

    console.log(newWorkout);

    axios
    .post("http://localhost:4000/Workouts/addWorkout", newWorkout)
    .then(() => {
      message.success("Workout added");
      setTimeout(() => {
        window.location.reload(); // Reload the page after a short delay
      }, 500); // Adjust the delay duration as needed
    })
    .catch((err) => {
      alert(err);
    });
  
  }

  const [chartData, setChartData] = useState([]);
  const [workoutCount, setWorkoutCount] = useState(0);
  console.log(workoutCount)

  //Set Trainer Name
  const workname = userInfo.name;
  console.log(workname);

  const fetchworkouts = async () => {
    const response = await fetch(
      `http://localhost:4000/Workouts/workouts/${userInfo.name}`
    );
    const json = await response.json();
    const c = [
      {
        month: "JAN",
        uv: 0,
      },
      {
        month: "FEB",
        uv: 0,
      },
      {
        month: "MAR",
        uv: 0,
      },
      {
        month: "APR",
        uv: 0,
      },
      {
        month: "MAY",
        uv: 0,
      },
      {
        month: "JUN",
        uv: 0,
      },
      {
        month: "JUL",
        uv: 0,
      },
      {
        month: "AUG",
        uv: 0,
      },
      {
        month: "SEP",
        uv: 0,
      },
      {
        month: "OCT",
        uv: 0,
      },
      {
        month: "NOV",
        uv: 0,
      },
      {
        month: "DEC",
        uv: 0,
      },
    ];

    if (response.ok) {
      let count = 0;
      json.map((workout) => {
        const month = parseInt(workout.date.slice(5, 7));
        c[month - 1].uv = c[month - 1].uv + 1;
        setChartData(c);
        count++;
      });
      setWorkoutCount(count);
      setChartData(c);
    }
  };

  React.useEffect(() => {
    fetchworkouts();
  }, []);

  const [usersdata, setUs] = useState([]);
  //get drop down name list

  useEffect(() => {
    fetch("http://localhost:4000/Trainer/usernames")
      .then((response) => response.json())
      .then((data) => setUs(data));
  }, []);

  return (
    <div className="home-text-section">
     <p className="primary-text" style={{ color: "black", fontWeight: "bold",textAlign: "center" ,fontSize:"20px" }}>
    Welcome {workname}
  </p>
      <div
        className="container"
        style={{
          padding: "1%",
          paddingLeft: "10%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <WorkoutCountCardg>
          <div style={{ height: "300px", width: "800px" }}>
            {chartData.length !== 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={170} height={40} data={chartData}>
                  <Bar dataKey="uv" fill="#ff8000" />
                  <CartesianGrid strokeDasharray="0.01 0.01" />
                  <XAxis dataKey="month" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </WorkoutCountCardg>

        <div style={{ width: "190%", padding: "5%" }}>
          <WorkoutCountCard>
            <h2>Workout count</h2>
            <p>{workoutCount}</p>
            <center>
              <Link to="/wpage">
                <button className="secondary-button">Workouts</button>
              </Link>
            </center>
          </WorkoutCountCard>
        </div>
      </div>
      <br />
      <center>
  <p style={{ paddingLeft: "190px" }}>Create Workouts</p>
</center>
      <div id="rehan" className="containerr">
        <form onSubmit={sendData}>
          <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px"}}>Username</label>
          <div className="form-outline mb-4">
            <select
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            >
              <option value="">Select a username</option>
              {usersdata.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px"}}>
            Trainer name
          </label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="coachername"
              value={workname}
              required
              className="form-control"
              placeholder="Enter Trainer's Name"
            />
          </div>
          <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Schedule Number</label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="sheduleno"
              className="form-control"
              placeholder="Enter Shedule No"
              onChange={(e) => {
                setsheduleno(e.target.value);
              }}
            />
          </div>
          <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Date</label>
          <div className="form-outline mb-4">
            <input
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              className="form-control"
              placeholder="Enter date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />

            
            <br></br>
            <br></br>
            <h5 align="left">Schedule</h5>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="set1"
                  className="form-control"
                  required
                  placeholder="Enter set 1"
                  onChange={(e) => {
                    setset1(e.target.value);
                  }}
                />

                <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 1</label>
              </div>
            </div>

            <div className="col">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="set2"
                  className="form-control"
                  placeholder="Enter set 2"
                  required
                  onChange={(e) => {
                    setset2(e.target.value);
                  }}
                />
                <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 2</label>
              </div>
            </div>

            <div className="col">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="set3"
                  required
                  className="form-control"
                  placeholder="Enter set 3"
                  onChange={(e) => {
                    setset3(e.target.value);
                  }}
                />
                <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 3</label>
              </div>
            </div>

            <div className="col">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="set4"
                  required
                  className="form-control"
                  placeholder="Enter set 4"
                  onChange={(e) => {
                    setset4(e.target.value);
                  }}
                />
                <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 4</label>
              </div>
            </div>

            <div className="col">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="set5"
                  required
                  className="form-control"
                  placeholder="Enter set 5"
                  onChange={(e) => {
                    setset5(e.target.value);
                  }}
                />
                <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 5</label>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="set6"
                    required
                    className="form-control"
                    placeholder="Enter set 6"
                    onChange={(e) => {
                      setset6(e.target.value);
                    }}
                  />
                  <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 6</label>
                </div>
              </div>

              <div className="col">
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="set7"
                    className="form-control"
                    required
                    placeholder="Enter set 7"
                    onChange={(e) => {
                      setset7(e.target.value);
                    }}
                  />
                  <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 7</label>
                </div>
              </div>

              <div className="col">
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="set8"
                    required
                    className="form-control"
                    placeholder="Enter set 8"
                    onChange={(e) => {
                      setset8(e.target.value);
                    }}
                  />
                  <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 8</label>
                </div>
              </div>

              <div className="col">
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="set9"
                    className="form-control"
                    placeholder="Enter set 9"
                    onChange={(e) => {
                      setset9(e.target.value);
                    }}
                  />
                  <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 9</label>
                </div>
              </div>

              <div className="col">
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="set1"
                    className="form-control"
                    placeholder="Enter set 10"
                    required
                    onChange={(e) => {
                      setset10(e.target.value);
                    }}
                  />
                  <label style={{ fontWeight: "bold", color: "black" ,fontSize: "17px" }}>Set 10</label>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <center>
            <input
              type="submit"
              style={{
                backgroundColor: "orange",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                borderRadius: "10px",
                width: "650px",
                height: "35px", // Adjust the height as needed
                transition: "transform 0.3s ease", // Animation transition
              }}
              value="Send Workout"
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)"; //scale transformation on mouse enter
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"; // Revert scale transformation on mouse leave
              }}
            />
            <br></br>
          </center>
        </form>
      </div>
      <br /> <br />
    </div>
  );
};

const WorkoutCountCard = styled.div`
  background-color: #f9fafc;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
  width: 200px;

  h2 {
    color: #444444;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #888888;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
`;
const WorkoutCountCardg = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 890px;

  h2 {
    color: #444444;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #888888;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
`;

export default Dashboardfunction;
