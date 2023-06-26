import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { CSVLink } from "react-csv";
import "./TableFitness.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Grid } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@material-ui/core";
import Papa from "papaparse";
import { header } from "nutritionix-api";

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#fe9e0d",

    color: "white",
    fontWeight: "bold",
  },
});

const TableFitness = (props) => {
  console.log("User id in table data " + props.userID);
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/fitnessLog/get/${props.userID}`)
      .then((response) => {
        setTableData(response.data.logs);
        console.log(tableData);
      })
      .catch((error) => console.log(error));
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#000000",
      },
      primary: {
        main: "#fe9e0d",
      },
    },
  });
  const classes = useStyles();
  const [searchDate, setSearchDate] = useState("");

  const handleSearch = (e) => {
    setSearchDate(e.target.value);
  };

  const filteredData =
    tableData &&
    tableData.filter((data) => {
      return data.date.includes(searchDate);
    });

  const FileDownload = () => {
    // Create a Blob object from the CSV data
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const csvData = [
      ["FlexFitness - Fitness Tracking Report"],
      ["                                                  "],
      ["Date", "Weight", "BMI", "Blood Pressure", "Bodyfat Percentage"],
      ...tableData.map((fitnessData) => [
        fitnessData.date,
        fitnessData.Weight,
        fitnessData.BMI,
        fitnessData.BldPressure,
        fitnessData.Bodyfat,
      ]),
      [
        "                                                                                           ",
      ],
      [`Generated at ${timestamp}`],
      ["All Rights Reserved - FlexFitness"],
    ];
    const csv = csvData.map((row) => row.join(",")).join("\n");

    const element = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "Fitness.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    // const dataWithHeader = [["hi"], ...tableData]; // Wrap "hi" in an array
    // const csv = Papa.unparse(dataWithHeader);
    // const blob = new Blob([csv], { type: "text/csv" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "fitnessData.csv";
    // link.click();
    // URL.revokeObjectURL(url);
  };
  return (
    <div className="p">
      {tableData ? (
        <div>
          <div>
            <Grid container>
              <Grid item xs={1}>
                {/* <CSVLink data={combinedTestData} filename={"fitnessLog.csv"}>
                  {" "}
                  <button className="report-btn">
                    <FileDownloadIcon />
                  </button>
                </CSVLink> */}
                <button className="report-btn" onClick={FileDownload}>
                  <FileDownloadIcon />
                </button>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={3}>
                {" "}
                <TextField
                  color="secondary"
                  label="Search by Date"
                  variant="outlined"
                  size="small"
                  value={searchDate}
                  onChange={handleSearch}
                  InputProps={{
                    style: { borderColor: "#fe9e0d" },
                  }}
                />
              </Grid>
            </Grid>
          </div>

          {console.log(tableData)}
          <TableContainer component={Paper} id="tts">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableHeader}
                    style={{
                      height: 60,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <h5>Date</h5>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeader}
                    style={{
                      height: 60,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <h5>Weight</h5>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeader}
                    style={{
                      height: 60,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <h5>BMI</h5>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeader}
                    style={{
                      height: 60,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <h5>Resting Heart Rate</h5>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeader}
                    style={{
                      height: 60,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <h5>Body Fat Percentage</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((tableData) => (
                  <TableRow key={tableData.date} style={{ height: 40 }}>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <h6>{tableData.date.substring(0, 10)}</h6>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <h6>{tableData.Weight} kg</h6>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <h6>{tableData.BMI} kg/m^m</h6>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <h6>{tableData.BldPressure} bpm</h6>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <h6>{tableData.Bodyfat} %</h6>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        console.log("no data")
      )}
    </div>
  );
};

export default TableFitness;
