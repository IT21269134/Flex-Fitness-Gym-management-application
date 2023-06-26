import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Cards.css";
import Card from "./Card";
import {
  UilWeight,
  UilMedicalDrip,
  UilChart,
  UilTachometerFastAlt,
} from "@iconscout/react-unicons";
let CardData = [
  {
    title: "Weight",
    color: {
      backGround: "#FF9900",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 0,
    value: 0,
    unit: "kg",
    png: UilWeight,
    series: {
      name: "Weight trend Chart",
      data: [71.5, 67.5, 67.1, 60.0],
    },
  },
  {
    title: "BMI",
    color: {
      backGround: "#fe9e0d",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 0,
    value: 0,
    png: UilChart,
    unit: "kg",
    series: {
      name: "Weight trend Chart",
      data: [71.5, 67.5, 67.1, 60.0],
    },
  },
  {
    title: "Body fat percentage",
    color: {
      backGround: "#fe9e0d",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 0,
    value: 0,
    png: UilMedicalDrip,
    unit: "%",
    series: {
      name: "Weight trend Chart",
      data: [71.5, 67.5, 67.1, 60.0],
    },
  },

  {
    title: "Blood Pressure",
    //background: linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255, 202, 113) -46.42%);

    color: {
      backGround: "#fe9e0d",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 0,
    value: 0,
    png: UilTachometerFastAlt,
    unit: "bpm",
    series: {
      name: "Weight trend Chart",
      data: [71.5, 67.5, 67.1, 60.0],
    },
  },
];

const Cards = (props) => {
  const [cardData1, setDatavalues] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await axios.get(
          `http://localhost:4000/fitnessLog/getProgress/${props.userID}`
        );
        const response2 = await axios.get(
          `http://localhost:4000/fitnessLog/getLValues/${props.userID}`
        );
        const progress = response1.data.logs;
        const cValues = response2.data.logs;
        console.log(response1.data.logs);

        console.log(cValues);
        const Data = [
          {
            title: "Weight",
            color: {
              backGround: "#FF9900",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: progress[0].WeightProgress,
            value: cValues[0].Weight,
            unit: "kg",
            png: UilMedicalDrip,
            series: {
              type: "area",
              data: [71.5, 67.5, 67.1, 60.0],
            },
          },
          {
            title: "BMI",
            color: {
              backGround: "#FF9900",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: progress[0].bmiProgress,
            value: cValues[0].BMI,
            png: UilChart,
            unit: "kg/m^m",
            series: {
              type: "area",
              data: [71.5, 67.5, 67.1, 60.0],
            },
          },
          {
            title: "Body Fat",
            color: {
              backGround: "#FF9900",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: progress[0].bFatProgress,
            value: cValues[0].Bodyfat,
            png: UilTachometerFastAlt,
            unit: "%",
            series: {
              type: "area",
              data: [71.5, 67.5, 67.1, 60.0],
            },
          },
          {
            title: "Heart Rate",
            color: {
              backGround: "#FF9900",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: progress[0].hRateProgress,
            value: cValues[0].BldPressure,
            png: UilWeight,
            unit: "bpm",
            series: {
              type: "area",
              data: [71.5, 67.5, 67.1, 60.0],
            },
          },
        ];
        console.log(Data);
        setDatavalues(Data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  {
    cardData1 && console.log(typeof cardData1);
    console.log(typeof CardData);
  }
  return (
    <div className="Cards">
      {cardData1 &&
        cardData1.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
                unit={card.unit}
              />
            </div>
          );
        })}
      {!cardData1 &&
        CardData.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
                unit={card.unit}
              />
            </div>
          );
        })}
    </div>
  );
};
export default Cards;
