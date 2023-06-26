//require files
const workoutRouter = require("./Workouts");
const trainerRouter = require("./Trainers");

module.exports = (app) => {
  /*add your app.use() here*/
  app.use("/Trainer", trainerRouter);
  app.use("/Workouts", workoutRouter);
};
