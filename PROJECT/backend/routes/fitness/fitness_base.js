//require files

module.exports = (app) => {
  const fitnessGoalRoute = require("../../controllers/FitnessGoals");
  app.use("/fitnessGoal", fitnessGoalRoute);
  const fitnessLogRoute = require("../../controllers/FitnessLogs");
  app.use("/fitnessLog", fitnessLogRoute);
  const workoutLogRoute = require("../../controllers/workoutLogs");
  app.use("/workoutLog", workoutLogRoute);
};
