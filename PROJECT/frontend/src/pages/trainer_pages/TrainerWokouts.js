import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import WorkoutDetailss from "../../components/Trainer-component/WorkoutDetails";
import "./workouts.css";
import { Store } from "../../components/Online-shopping-components/Store";
//import axios from "axios";
//import "./TrainerReg.css"

//create Trainer
const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchworkouts = async () => {
      const response = await fetch(
        `http://localhost:4000/Workouts/workouts/${userInfo.name}`
      );
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };
    fetchworkouts();
  }, []);

  return (
    <div>
      <p className="primary-text">Workout management</p>
        <div className="hom">
          <div className="workouts">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetailss workout={workout} key={workout._id} />
              ))}
          </div>
        </div>

      <br />
    </div>
  );
};

export default WorkoutPage;
