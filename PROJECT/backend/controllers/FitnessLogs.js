const router = require("express").Router();
const { response } = require("express");
const FitnessLog = require("../../backend/models/FitnessLog");
let fitnessLog = require("../../backend/models/FitnessLog");

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  Weight = Number(req.body.Weight);
  Bodyfat = Number(req.body.BFat);
  BMI = Number(req.body.BMI);
  date = req.body.date;
  cDate = date.substring(0, 10);
  height = Number(req.body.height);
  BldPressure = Number(req.body.HRate);
  WeightProgress = Number(req.body.WeightProgress);
  bFatProgress = Number(req.body.bFatProgress);
  hRateProgress = Number(req.body.hRateProgress);
  bmiProgress = Number(req.body.bmiProgress);
  console.log(typeof date);

  const newFitnessLog = new FitnessLog({
    userId,
    Bodyfat,
    Weight,
    BldPressure,
    BMI,
    date,
    height,
    WeightProgress,
    bFatProgress,
    hRateProgress,
    bmiProgress,
  });

  newFitnessLog
    .save()
    .then(() => {
      res.json("SuccessFully logged fitness data ");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get five
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const logs = await FitnessLog.find({ userId: userID })
    .select({
      _id: 0,
      userId: 0,
    })

    .sort({ date: "desc" }) // sort by date in descending order
    .then((logs) => {
      res.status(200).send({ status: "last 5 fitness logs Fetched", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get goal" });
    });
});

//get one
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const logs = await FitnessLog.find({ userId: userID })
    .sort({ date: "desc" }) // sort by date in descending order
    .limit(3) // get the last 3 logs
    .then((logs) => {
      res.status(200).send({ status: "last 3 fitness logs Fetched", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get goal" });
    });
});

//Fetch data from specific user
router.route("/getAll/:id").get(async (req, res) => {
  let userID = req.params.id;
  const logs = await FitnessLog.find({ userId: userID })
    .sort({ date: "desc" })
    .then((logs) => {
      res.status(200).send({ status: "all fitness logs Fetched", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get goal" });
    });
});

//get latest progress data
router.route("/getProgress/:id").get(async (req, res) => {
  let userID = req.params.id;
  const logs = await FitnessLog.find({ userId: userID })
    .select({
      _id: 0,
      WeightProgress: 1,
      bFatProgress: 1,
      hRateProgress: 1,
      bmiProgress: 1,
    })
    .sort({ date: "desc" }) // sort by date in descending order
    .limit(1) // get the last 3 logs
    .then((logs) => {
      res.status(200).send({ status: "Progress fetched", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get Progress" });
    });
});

router.route("/getLValues/:id").get(async (req, res) => {
  let userID = req.params.id;
  const logs = await FitnessLog.find({ userId: userID })
    .select({
      _id: 0,
      Weight: 1,
      Bodyfat: 1,
      BldPressure: 1,
      BMI: 1,
    })
    .sort({ date: "desc" }) // sort by date in descending order
    .limit(1) // get the last 3 logs
    .then((logs) => {
      res.status(200).send({ status: "Progress fetched", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get Progress" });
    });
});

module.exports = router;
