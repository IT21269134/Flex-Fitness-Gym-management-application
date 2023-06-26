const router = require("express").Router();
const workout = require("../../models/workoutModel");
let Workout = require("../../models/workoutModel");

//Add workouts plans
router.route("/addWorkout").post((req, res) => {
  const username = req.body.username;
  const coachername = req.body.coachername;
  const sheduleno = req.body.sheduleno;
  const date = req.body.date;
  const set1 = req.body.set1;
  const set2 = req.body.set2;
  const set3 = req.body.set3;
  const set4 = req.body.set4;
  const set5 = req.body.set5;
  const set6 = req.body.set6;
  const set7 = req.body.set7;
  const set8 = req.body.set8;
  const set9 = req.body.set9;
  const set10 = req.body.set10;

  const newWorkout = new Workout({
    username,
    coachername,
    sheduleno,
    date,
    set1,
    set2,
    set3,
    set4,
    set5,
    set6,
    set7,
    set8,
    set9,
    set10,
  });

  newWorkout
    .save()
    .then(() => {
      res.json("Workout added");
    })
    .catch((err) => {
      console.log(err);
      res.send("Error workout adding");
    });
});

//display all workouts
router.route("/workouts/:name").get(async (req, res) => {
  const workout = await Workout.find({
    coachername: req.params.name,
  });
  if (workout) {
    res.send(workout);
  } else {
    res.status(404).send({ message: "Workoutnot found" });
  }
});

//Delete workout
router.route("/delete/:id").delete(async (req, res) => {
  let wId = req.params.id;

  await Workout.findByIdAndDelete(wId)
    .then(() => {
      res.status(200).send({ status: "Workout Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with Workout Student", error: err.messege });
    });
});

//update workout
router.route("/update/:id").put(async (req, res) => {
  let wId = req.params.id;

  //destructure
  const {
    username,
    coachername,
    sheduleno,
    date,
    set1,
    set2,
    set3,
    set4,
    set5,
    set6,
    set7,
    set8,
    set9,
    set10,
  } = req.body;

  const updateWorkout = {
    username,
    coachername,
    sheduleno,
    date,
    set1,
    set2,
    set3,
    set4,
    set5,
    set6,
    set7,
    set8,
    set9,
    set10,
  };

  const update = await workout
    .findByIdAndUpdate(wId, updateWorkout)
    .then(() => {
      res.status(200).send({ status: "Workout Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error Update Workout", error: err.message });
    });
});

module.exports = router;
