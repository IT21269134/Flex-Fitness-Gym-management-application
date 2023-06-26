import React, { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import axios from "axios";

const ChartWorkouts = (props) => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/workoutLog/getWorkoutLogs/${props.userID}`)
      .then((response) => {
        setData(response.data.logs);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDownloadChart = () => {
    html2canvas(chartRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = url;
        link.click();
      });
    });
  };

  return (
    <div>
      <b>
        <p style={{ fontSize: "30px" }} className="Heading-Fitness">
          My Workout Progress{" "}
        </p>
      </b>
      {data && (
        <BarChart
          width={1000}
          height={500}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          ref={chartRef}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#FF9900" />
        </BarChart>
      )}
    </div>
  );
};

export default ChartWorkouts;
