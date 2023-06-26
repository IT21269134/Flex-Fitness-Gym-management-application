import React, { useState } from "react";
import "./ViewAnalysis.css";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";
import { useEffect } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ProgressBar from "react-bootstrap/ProgressBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AnalysisDinner() {
  const [nutrition, setNutrition] = useState([]);
  const [vals, setVals] = useState([]);
  const [totalCal, setTotalCal] = useState(0);
  const [carbsVal, setCarbsVal] = useState(0);
  const [proteinVal, setProteinVal] = useState(0);
  const [fatVal, setFatVal] = useState(0);

  //Read operation
  useEffect(() => {
    function GetNutrition() {
      axios
        .get("http://localhost:4000/dinner/counter")
        .then((res) => {
          setNutrition(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    GetNutrition();
  }, []);

  useEffect(() => {
    function GetVals() {
      axios
        .get("http://localhost:4000/dinner/counter")
        .then((res) => {
          setVals(res.data);
          setNumericalVals(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    function setNumericalVals(vals) {
      const totalCarbs = vals.reduce(
        (acc, val) => acc + Number(val.totalCarb),
        0
      );
      const totalProtein = vals.reduce(
        (acc, val) => acc + Number(val.totalProtein),
        0
      );
      const totalCal = vals.reduce(
        (acc,val) => acc + Number(val.calories),
        0
      );
      const totalFat = vals.reduce((acc, val) => acc + Number(val.totalFat), 0);
      setCarbsVal(totalCarbs);
      setFatVal(totalFat);
      setProteinVal(totalProtein);
      setTotalCal(totalCal);
    }

    GetVals();
  }, []);

  // Calculate percentage values
  const totalIntake = carbsVal + proteinVal + fatVal;
  const carbsPercentage = ((carbsVal / totalIntake) * 100).toFixed(2);
  const proteinPercentage = ((proteinVal / totalIntake) * 100).toFixed(2);
  const fatPercentage = ((fatVal / totalIntake) * 100).toFixed(2);

   //CSV Download
    function convertToCsv() {
      const headerRow = "Food Item,Calories,Fat,Carbs,Protein";
      const textRows = [
        "Flex Fitness Gyms",
        "Nutrition Analysis Report",
        "Dinner Analysis",
      ];
      const additionalText = "All rights reserved.";
      const footerRow = `Total,${totalCal},${fatVal},${carbsVal},${proteinVal}`;
      const currentDate = new Date().toLocaleDateString();
      const date = `Generated Date: ${currentDate}`;
    
      // Combine the text rows, header row, and data rows
      const csvData = [...textRows, headerRow, ...nutrition.map(
        (nutri) =>
          `${nutri.food_name},${nutri.calories},${nutri.totalFat},${nutri.totalCarb},${nutri.totalProtein}`
      )];
    
      // Add the footer row
      csvData.push(footerRow, date, additionalText);

    // Join the array of strings with newlines to create the final CSV string
    const csvString = csvData.join("\n");

    // Return the CSV string
    return csvString;
  }

  function downloadCsv() {
    // Get the CSV string
    const csvString = convertToCsv();

    // Create a Blob with the CSV string
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    // Create a download link element
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);

    // Set the filename for the download
    downloadLink.download = "Dinner_Analysis.csv";

    // Append the download link to the DOM and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up the download link element
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="body">
      <div className="body-div-for-border">
        <div className="div-for-spacing-between-border-and-content">
          <div className="heading-analysis">
            <h1>Dinner Analysis</h1>
          </div>

          <div className="download-btn-div">
            <button className="report-btn" onClick={downloadCsv}>
              <FileDownloadIcon />
            </button>
          </div>

          <div className="this-needs-to-break-into-two-sections">
            <div className="first-of-two">
              <div className="again-devide-into-two">
                <div className="second-1">
                  <PieChart
                    data={[
                      {
                        title: "Carbs",
                        value: Number(carbsVal),
                        color: "#ED7117",
                      },
                      {
                        title: "Protein",
                        value: Number(proteinVal),
                        color: "#EC9706",
                      },
                      { title: "Fat", value: Number(fatVal), color: "#E5C646" },
                    ]}
                  />
                </div>

                <div className="second-2">
                  <div className="under-pie-description-of-colors">
                    <div class="box1">
                      <p className="pie-d">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Carbs
                      </p>
                    </div>
                    <br />
                    <div class="box2">
                      <p className="pie-d">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Protein
                      </p>
                    </div>
                    <br />
                    <div class="box3">
                      <p className="pie-d">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fat
                      </p>
                    </div>
                  </div>
                </div>

                <div className="table-div-section">
                  <table id="report-table">
                    <thead>
                      <tr>
                        <th>Food Item</th>
                        <th>Calories</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Protein</th>
                      </tr>
                    </thead>

                    <tbody>
                      {nutrition.map((nutri) => (
                        <tr>
                          <td style={{color:"black"}}>{nutri.food_name}</td>
                          <td style={{color:"black"}}>{nutri.calories}</td>
                          <td style={{color:"black"}}>{nutri.totalFat}</td>
                          <td style={{color:"black"}}>{nutri.totalCarb}</td>
                          <td style={{color:"black"}}>{nutri.totalProtein}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="second-of-two">
              <div className="padding-sections">
                <div className="first-section">
                  <p className="intake-h-txt">Protein Intake</p>
                  <div className="second-two">
                    <div className="div">
                      <p className="text-para-total">
                        Total protein intake is {Number(proteinVal).toFixed(2)}{" "}
                        calories
                      </p>
                      <p className="presentage-txt">
                        {Number(proteinPercentage)}%
                      </p>
                    </div>
                    <div className="div2">
                      <CheckCircleIcon className="icon" fontSize="large" />
                    </div>
                  </div>
                  <div className="progress-bar-div">
                    <p>
                      <ProgressBar
                        className="progress"
                        striped
                        variant="warning"
                        now={Number(proteinPercentage)}
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="padding-sections">
                <div className="second-section">
                  <p className="intake-h-txt">Carb Intake</p>
                  <div className="second-two">
                    <div className="div">
                      <p className="text-para-total">
                        Total carbohydrate intake is{" "}
                        {Number(carbsVal).toFixed(2)} calories
                      </p>
                      <p className="presentage-txt">
                        {Number(carbsPercentage)}%
                      </p>
                    </div>
                    <div className="div2">
                      <CheckCircleIcon className="icon" fontSize="large" />
                    </div>
                  </div>
                  <div className="progress-bar-div">
                    <p>
                      <ProgressBar
                        className="progress"
                        striped
                        variant="warning"
                        now={Number(carbsPercentage)}
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="padding-sections">
                <div className="third-section">
                  <p className="intake-h-txt">Fat Intake</p>
                  <div className="second-two">
                    <div className="div">
                      <p className="text-para-total">
                        Total fat intake is {Number(fatVal).toFixed(2)} calories
                      </p>
                      <p className="presentage-txt">{Number(fatPercentage)}%</p>
                    </div>
                    <div className="div2">
                      <CheckCircleIcon className="icon" fontSize="large" />
                    </div>
                  </div>
                  <div className="progress-bar-div">
                    <p>
                      <ProgressBar
                        className="progress"
                        striped
                        variant="warning"
                        now={Number(fatPercentage)}
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="padding-sections">
                <div className="fourth-section">
                  <p className="intake-h-txt">
                    YOUR TOTAL CALORIE INTAKE IS {totalIntake.toFixed(2)} CAL
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDinner;
