import Progress from "../../components/FitnessComponents/Progress";
import "./Fitness_home.css";
const Fitness_home = (props) => {
  return (
    <div className="FitnessMain">
      <div className="AppGlass">
        <Progress userID={props.userID}></Progress>
      </div>
    </div>
  );
};

export default Fitness_home;
