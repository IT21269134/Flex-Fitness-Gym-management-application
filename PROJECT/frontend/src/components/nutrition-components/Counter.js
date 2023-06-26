import React from "react";
import "./Counter.css";
import Slider1 from './Slider';
import Slider2 from './Slider2';
import Slider3 from './Slider3';

function Counter() {
  return (
    <div className="calorie-counter">
      <div className="counter-heading">
        <h1 id = "ttrss">Nutrition Diary</h1>
      </div>

      <div className="heading-para">
        <p>
          Your ultimate weight-loss resources with a free food diary and the
          best calorie counter - sleek, smart, simple. It's the most personal
          weight-loss, diet, and nutrition assistant. Add them to your Daily
          Totals to see how your calories add up!
        </p>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div className="category-title">
              <h2 id = "ttrsss">Breakfast</h2>
            </div>
            <Slider1 />
          </div>
          <div class="col-sm">
            <div className="category-title">
              <h2 id = "ttrsss">Lunch</h2>
            </div>
            <Slider2 />
          </div>
          <div class="col-sm">
            <div className="category-title">
              <h2 id = "ttrsss">Dinner</h2>
            </div>
            <Slider3 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
