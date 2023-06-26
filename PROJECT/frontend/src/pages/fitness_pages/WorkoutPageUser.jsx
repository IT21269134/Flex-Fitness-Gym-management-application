import axios from "axios";
import { useEffect, useState } from "react";
import { Grid, Paper, createTheme, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import FormCheckBox from "../../components/FitnessComponents/FormCheckBox";
import ButtonWrapper from "../../components/FitnessComponents/FormSumbitButton";
import * as Yup from "yup";
import { ThemeProvider } from "@emotion/react";
// const Form_Validation = Yup.object().shape({
//   ExerciseOne: Yup.boolean(),
// });
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

const WorkoutPageUser = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [showToastUpdate, setShowToastUpdate] = useState(false);
  const { state } = useLocation();
  const [workouts, setworkouts] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/workoutLog/getWorkouts/${state.data}`)
      .then((response) => {
        setworkouts(response.data.workoutSchedule);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // January is 0
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  const Initial_FORM_State = {
    userId: state.data,
    date: formattedDate,
    ExerciseOne: false,
    ExerciseTwo: false,
    ExerciseThree: false,
    ExerciseFour: false,
    ExerciseFive: false,
    ExerciseSix: false,
    ExerciseSeven: false,
    ExerciseEight: false,
    ExerciseNine: false,
    ExerciseTen: false,
    count: 0,
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
    navigate(`/fitness_home/${state.data}`);
  };

  return (
    <div>
      <Snackbar
        open={showToast}
        onClose={handleToastClose}
        message="workouts logged SuccessFully"
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{ style: { backgroundColor: "#fe9e0d" } }}
        style={{ textAlign: "center" }}
      />

      {workouts ? (
        <div>
          <Formik
            initialValues={{ ...Initial_FORM_State }}
            // validationSchema={{ ...Form_Validation }}
            onSubmit={async (values) => {
              let count = 0;

              if (values.ExerciseOne == true) {
                count++;
              }
              if (values.ExerciseTwo == true) {
                count++;
              }
              if (values.ExerciseThree == true) {
                count++;
              }
              if (values.ExerciseFour == true) {
                count++;
              }
              if (values.ExerciseFive == true) {
                count++;
              }
              if (values.ExerciseSix == true) {
                count++;
              }
              if (values.ExerciseSeven == true) {
                count++;
              }
              if (values.ExerciseEight == true) {
                count++;
              }
              if (values.ExerciseNine == true) {
                count++;
              }
              if (values.ExerciseTen == true) {
                count++;
              }
              const data = {
                userId: state.data,
                date: formattedDate,
                value: count,
              };
              console.log(count);
              console.log(values);

              try {
                const response = await axios.post(
                  "http://localhost:4000/workoutLog/addLogs",
                  data
                );
                console.log(response);
                setShowToast(true);
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            <Form>
              <ThemeProvider theme={theme}>
                <Paper sx={{ margin: "4rem" }}>
                  <Grid container sx={{ padding: "2rem" }}>
                    <Grid item xs={12}>
                      <p
                        style={{ fontSize: "40px", color: "#fe9e0d" }}
                        className="Heading-Fitness"
                      >
                        My workout Log
                      </p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox name="ExerciseOne" legend={workouts.set1} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox name="ExerciseTwo" legend={workouts.set2} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseThree"
                        legend={workouts.set3}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseFour"
                        legend={workouts.set4}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseFive"
                        legend={workouts.set5}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox name="ExerciseSix" legend={workouts.set6} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseSeven"
                        legend={workouts.set7}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseEight"
                        legend={workouts.set8}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseNine"
                        legend={workouts.set9}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormCheckBox
                        name="ExerciseTen"
                        legend={workouts.set10}
                      />
                    </Grid>
                    <Grid item md={9}></Grid>
                    <Grid item md={3} sx={{ padding: "2rem" }}>
                      <ButtonWrapper
                        sx={{
                          width: "100%",
                          backgroundColor: "red",
                        }}
                      >
                        SUBMIT
                      </ButtonWrapper>
                    </Grid>
                  </Grid>
                </Paper>
              </ThemeProvider>
            </Form>
          </Formik>
        </div>
      ) : (
        <div>do not </div>
      )}
    </div>
  );
};

export default WorkoutPageUser;
