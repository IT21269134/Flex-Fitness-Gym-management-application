import { Link } from "react-router-dom";
import CounterHome from '../../components/nutrition-components/Counter';

const Nutrition_home = () => {
  return (

        <div className="home-calorie-counter">
        <div className="counter">
          <CounterHome />
        </div>
          <br />
        </div>
 
  );
};

export default Nutrition_home;

