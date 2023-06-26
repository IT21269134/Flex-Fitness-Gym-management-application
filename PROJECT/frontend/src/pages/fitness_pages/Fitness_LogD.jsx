import {
  createTheme,
  Box,
  Grid,
  Typography,
  TextField,
  Snackbar,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { React, useState } from "react";
import TextFieldWrapper from "../../components/FitnessComponents/formTextField";
import { ThemeProvider } from "@emotion/react";
import ButtonWrapper from "../../components/FitnessComponents/FormSumbitButton";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import FomrDatePicker from "../../components/FitnessComponents/FomrDatePicker";

const Form_Validation = Yup.object().shape({
  Weight: Yup.number()
    .min(0, "Value must be greater than or equal to 0")
    .required("weight is required")
    .typeError("Please a enter weight"),
  height: Yup.number()
    .min(0, "Value must be greater than or equal to 0")
    .required("height is required")
    .typeError("Please a enter height")
    .max(100, "Height must in meters"),
  BFat: Yup.number()
    .min(0, "Value must be greater than or equal to 0")
    .required("body fat percentage is required")
    .typeError("Please a enter valid body fat percentage "),
  HRate: Yup.number()
    .min(0, "Value must be greater than or equal to 0")
    .required("Heart rate is required")
    .typeError("Please a enter valid blood pressure")
    .max(200, "Resting heart rate is invalid"),

  date: Yup.date().required("Plese enter date"),
});
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

function Fitness_LogD(props) {
  const { state } = useLocation();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
    navigate(`/Fitness_home/${data.userId}`);
  };
  const data = state.data;
  console.log(data);
  const INITAL_FORM_STATE = {
    userId: data.userId,
    Weight: "",
    BFat: "",
    HRate: "",
    height: "",
    date: "",
    BMI: 0.0,
    WeightProgress: "",
    bFatProgress: "",
    hRateProgress: "",
    bmiProgress: 0,
  };

  return (
    <div className="AppGlass">
      <Snackbar
        open={showToast}
        onClose={handleToastClose}
        message="Data Logged Successfully"
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{ style: { backgroundColor: "#fe9e0d" } }}
        style={{ textAlign: "center" }}
      />
      <Formik
        initialValues={{ ...INITAL_FORM_STATE }}
        validationSchema={Form_Validation}
        onSubmit={async (values) => {
          const response = await axios
            .post("http://localhost:4000/fitnessLog/add", values)
            .catch((err) => {
              if (err && err.response) {
                console.log("error", err);
              }
            });
          if (response) {
            setShowToast(true);
            console.log(response.data);
          }
        }}
      >
        {({ values, errors, touched }) => {
          /*set ProgressWeight*/
          if (touched.Weight) {
            if (data && data.currentWeight > data.idealWeight) {
              if (values.Weight > data.currentWeight) {
                values.WeightProgress = 0;
              } else {
                let WeightProgress =
                  (Math.abs(data.currentWeight - values.Weight) /
                    Math.abs(data.currentWeight - data.idealWeight)) *
                  100;
                if (WeightProgress >= 100) {
                  values.WeightProgress = 100.0;
                } else {
                  values.WeightProgress = WeightProgress.toFixed(2);
                }
              }
            } else if (data.currentWeight < data.idealWeight) {
              if (values.Weight < data.currentWeight) {
                values.WeightProgress = 0;
              } else {
                let WeightProgress =
                  (Math.abs(data.currentWeight - values.Weight) /
                    Math.abs(data.currentWeight - data.idealWeight)) *
                  100;
                if (WeightProgress >= 100) {
                  values.WeightProgress = 100.0;
                } else {
                  values.WeightProgress = WeightProgress.toFixed(2);
                }
              }
            } else {
              values.WeightProgress = 100.0;
            }
          }

          /* bpm */
          if (touched.Weight && touched.height) {
            let w1 = parseFloat(values.Weight);
            let h1 = parseFloat(values.height);
            let val = w1 / (h1 * h1);
            values.BMI = val.toFixed(2);
            if (data.CurrentBMI > data.idealBMI) {
              if (values.BMI > data.CurrentBMI) {
                values.bmiProgress = 0;
              } else {
                let bmiP =
                  (Math.abs(data.CurrentBMI - values.BMI) /
                    Math.abs(data.CurrentBMI - data.idealBMI)) *
                  100;
                if (bmiP >= 100) {
                  values.bmiProgress = 100.0;
                } else {
                  values.bmiProgress = bmiP.toFixed(2);
                }
              }
            } else if (data.cBMI < data.idealBMI) {
              if (values.BMI < data.cBMI) {
                values.bmiProgress = 0;
              } else {
                let bmiP =
                  (Math.abs(data.cBMI - values.BMI) /
                    Math.abs(data.cBMI - data.idealBMI)) *
                  100;
                if (bmiP >= 100) {
                  values.bmiProgress = 100.0;
                } else {
                  values.bmiProgress = bmiP.toFixed(2);
                }
              }
            } else {
              values.bmiProgress = 100.0;
            }
            console.log(values.bmiProgress);
          }
          /*heart rate */
          if (touched.HRate) {
            if (data.currentBldPressure > data.idealBldPressure) {
              if (values.HRate > data.currentBldPressure) {
                values.hRateProgress = 0;
              } else {
                let ans =
                  (Math.abs(data.currentBldPressure - values.HRate) /
                    Math.abs(data.currentBldPressure - data.idealBldPressure)) *
                  100;
                if (ans >= 100) {
                  values.hRateProgress = 100.0;
                } else {
                  values.hRateProgress = ans.toFixed(2);
                }
              }
            } else if (data.currentBldPressure < data.idealBldPressure) {
              if (values.HRate < data.currentBldPressure) {
                values.hRateProgress = 0;
              } else {
                let ans =
                  (Math.abs(data.currentBldPressure - values.HRate) /
                    Math.abs(data.currentBldPressure - data.idealBldPressure)) *
                  100;
                if (ans >= 100) {
                  values.hRateProgress = 100.0;
                } else {
                  values.hRateProgress = ans.toFixed(2);
                }
              }
            } else {
              values.hRateProgress = 100.0;
            }
          }
          /* body fat pecesntage setting */
          if (touched.BFat) {
            if (data.currentBodyfat > data.idealBodyfat) {
              if (values.BFat > data.currentBodyfat) {
                values.bFatProgress = 0;
              } else {
                let ans =
                  (Math.abs(data.currentBodyfat - values.BFat) /
                    Math.abs(data.currentBodyfat - data.idealBodyfat)) *
                  100;
                if (ans >= 100) {
                  values.bFatProgress = 100.0;
                } else {
                  values.bFatProgress = ans.toFixed(2);
                }
              }
            } else if (data.currentBodyfat < data.idealBodyfat) {
              if (values.BFat < data.currentBodyfat) {
                values.bFatProgress = 0;
              } else {
                let ans =
                  (Math.abs(data.currentBodyfat - values.BFat) /
                    Math.abs(data.currentBodyfat - data.idealBodyfat)) *
                  100;
                if (ans >= 100) {
                  values.bFatProgress = 100.0;
                } else {
                  values.bFatProgress = ans.toFixed(2);
                }
              }
            } else {
              values.hRateProgress = 100.0;
              console.log(values);
            }
          }

          return (
            <Form>
              <ThemeProvider theme={theme}>
                <Box p={2}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      
                      <p
                        style={{ fontSize: "30px", color: "#fe9e0d" }}
                        className="Heading-Fitness"
                      >
                        Current Fitness level

                      </p>
                    
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {/*current weight */}
                      <TextFieldWrapper
                        name="Weight"
                        id="cweight"
                        label="Current weight"
                        color="primary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <b style={{ color: "black" }}>kg</b>
                            </InputAdornment>
                          ),
                          startAdornment: (
                            <InputAdornment position="end">
                              <b style={{ color: "black" }}>
                                Current weight :&nbsp;&nbsp;&nbsp;
                              </b>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid xs={12} item md={6}>
                      {/*current height */}
                      <TextFieldWrapper
                        name="height"
                        id="cHeight"
                        label="Current height"
                        color="primary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InputAdornment position="end">
                                <b style={{ color: "black" }}>m</b>
                              </InputAdornment>
                            </InputAdornment>
                          ),
                          startAdornment: (
                            <InputAdornment position="end">
                              <b style={{ color: "black" }}>
                                Current height :&nbsp;&nbsp;&nbsp;
                              </b>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {/*current Body fat percentage */}
                      <TextFieldWrapper
                        name="BFat"
                        label="Body Fat percentage"
                        color="primary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InputAdornment position="end">
                                <b style={{ color: "black" }}>%</b>
                              </InputAdornment>
                            </InputAdornment>
                          ),
                          startAdornment: (
                            <InputAdornment position="end">
                              <b style={{ color: "black" }}>
                                Body Fat percentage :&nbsp;&nbsp;&nbsp;
                              </b>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {/*current heart rate */}
                      <TextFieldWrapper
                        name="HRate"
                        label="Resting Heart Rate"
                        color="primary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InputAdornment position="end">
                                <b style={{ color: "black" }}>bpm</b>
                              </InputAdornment>
                            </InputAdornment>
                          ),
                          startAdornment: (
                            <InputAdornment position="end">
                              <b style={{ color: "black" }}>
                                Resting Heart Rate :&nbsp;&nbsp;&nbsp;
                              </b>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FomrDatePicker
                        name="date"
                        color="primary"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">
                              <b style={{ color: "black" }}>
                                Date:&nbsp;&nbsp;&nbsp;
                              </b>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {/*current current BMI */}
                      <TextFieldWrapper
                        name="BMI"
                        id="BMI"
                        label="Current BMI"
                        color="secondary"
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="end">
                              <InputAdornment position="end">
                                <b style={{ color: "black" }}>
                                  Your BMI Is : &nbsp;&nbsp;&nbsp;
                                </b>
                              </InputAdornment>
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <InputAdornment position="end">
                                <b style={{ color: "black" }}>kg/m^m</b>
                              </InputAdornment>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={9} xs={12} p={3}></Grid>
                    <Grid item md={3} xs={12} p={2}>
                      <ButtonWrapper>SUBMIT</ButtonWrapper>
                    </Grid>
                  </Grid>
                </Box>
                <br />
              </ThemeProvider>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Fitness_LogD;
