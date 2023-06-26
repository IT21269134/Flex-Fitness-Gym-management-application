const router = require("express").Router();
const { response } = require("express");
const workoutLogs = require("../models/workoutModel");
const user = require("../models/UserModel");
const WorkoutLogDs = require("../models/WorkoutLog");

//add data
router.route("/addLogs").post((req, res) => {
  const userId = req.body.userId;
  const value = req.body.value;
  const date = req.body.date;

  console.log(typeof date);

  const newWorkoutLogDs = new WorkoutLogDs({
    userId,
    value,
    date,
  });

  newWorkoutLogDs
    .save()
    .then(() => {
      res.json("SuccessFully logged workout data ");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getWorkouts/:id").get(async (req, res) => {
  let userID = req.params.id;
  const name = await user
    .findOne({ _id: userID })
    .select({
      _id: 0,
      name: 1,
    })
    .then((name) => {
      console.log(name.name);
      const workoutSchedule = workoutLogs
        .findOne({ username: name.name })
        .select({
          _id: 0,
          set1: 1,
          set2: 1,
          set3: 1,
          set4: 1,
          set4: 1,
          set5: 1,
          set6: 1,
          set7: 1,
          set8: 1,
          set9: 1,
          set10: 1,
        })
        .then((workoutSchedule) => {
          res
            .status(200)
            .send({ status: "workout schedule feteched", workoutSchedule });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({ status: "Error with retrieveing workouts" });
        });
    });
});

router.route("/getWorkoutLogs/:id").get(async (req, res) => {
  let userID = req.params.id;
  const logs = await WorkoutLogDs.find({ userId: userID })
    .select({
      _id: 0,
      userId: 0,
      __v: 0,
    })
    .sort({ date: "desc" }) // sort by date in descending order
    .then((logs) => {
      res.status(200).send({ status: "last workout logs Fetched", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get workout" });
    });
});

module.exports = router;
