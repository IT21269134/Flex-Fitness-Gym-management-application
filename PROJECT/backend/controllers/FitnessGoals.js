const router = require("express").Router();
const { response } = require("express");
const FitnessGoal = require("../models/FitnessGoal");
let fitnessGoal = require("../models/FitnessGoal");

//Add A Goal
router.route("/add").post((req, res) => {
  userId = req.body.userId;
  currentWeight = Number(req.body.currentWeight);
  currentBodyfat = Number(req.body.currentBFat);
  CurrentBMI = Number(req.body.cBMI);
  currentBldPressure = Number(req.body.currentHRate);
  idealWeight = Number(req.body.iWeight);
  idealBodyfat = Number(req.body.iBFat);
  idealBldPressure = Number(req.body.iHeartRate);
  idealBMI = Number(req.body.iBMI);
  currentheight = Number(req.body.currentheight);

  const newFitnessGoal = new FitnessGoal({
    userId,
    currentWeight,
    currentBldPressure,
    currentBodyfat,
    CurrentBMI,
    idealWeight,
    idealBldPressure,
    idealBMI,
    idealBodyfat,
    currentheight,
  });

  newFitnessGoal
    .save()
    .then(() => {
      res.json("goal added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get specific Goal
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const goal = await FitnessGoal.findOne({ userId: userID })
    .then((goal) => {
      res.status(200).send({ status: "User Fetched", goal });
    })
    .catch(() => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get goal" });
    });
});
//edit specific Goal
router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id;
  const {
    currentWeight,
    currentBFat: currentBodyfat,
    cBMI: CurrentBMI,
    currentHRate: currentBldPressure,
    iWeight: idealWeight,
    iBFat: idealBodyfat,
    iHeartRate: idealBldPressure,
    iBMI: idealBMI,
    currentheight,
  } = req.body;

  const update = await FitnessGoal.findOneAndUpdate(
    { userId: userID },
    {
      $set: {
        currentWeight,
        currentBldPressure,
        currentBodyfat,
        CurrentBMI,
        idealWeight,
        idealBldPressure,
        idealBMI,
        idealBodyfat,
        currentheight,
      },
    }
  )
    .then(() => {
      res.status(200).send({ Status: "Your Goal has Updated Successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Status: "Error with updating data" });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;
  await FitnessGoal.findOneAndDelete({ userId: userID })
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch(() => {
      console.log("error");
      res.status(500).send({ status: "Error with delete user" });
    });
});
module.exports = router;
