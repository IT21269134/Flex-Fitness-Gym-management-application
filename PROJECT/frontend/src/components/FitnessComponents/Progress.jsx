import React from "react";
import "./Progress.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cards from "./Cards";
import { useState, useEffect } from "react";
import TableFitness from "./TableFitness";
import ChartWorkouts from "./Chart";
import { Grid } from "@mui/material";

const Progress = (props) => {
  const [goal, setGoal] = useState(null);
  const params = useParams();
  const { _id } = params;
  const userID = _id;
  console.log("this is in home page" + userID);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/fitnessGoal/get/${userID}`)
      .then((response) => setGoal(response.data.goal))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="Progress">
      <div className="Heading-bar">
        <b>
          <h1 id="paka" className="Heading-Fitness">
            Fitness Progress Page{" "}
          </h1>
        </b>
        {goal ? (
          <div className="after-log">
            <Link to="/fitness_log" state={{ data: goal }}>
              <button className="Fitness-button">Fitness Log</button>
            </Link>
            <Link to="/updateFitness_goals" state={{ data: goal }}>
              <button className="Fitness-button">Change my Goals</button>
            </Link>
          </div>
        ) : (
          <Link to="/fitness_goals" state={{ data: userID }}>
            <button className="Fitness-button">Set Goals</button>
          </Link>
        )}
        <Link to="/workout_log" state={{ data: userID }}>
          <button className="Fitness-button">Log workouts</button>
        </Link>
      </div>
      {goal ? (
        <div className="after-log">
          <Cards userID={userID}></Cards>
        </div>
      ) : (
        <Cards></Cards>
      )}

      <div className="fitnessTableHome">
        <TableFitness userID={userID} />
      </div>

      <Grid container>
        <Grid item xs={12}>
          <ChartWorkouts userID={userID} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Progress;
