const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fitnessLogSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  Weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  Bodyfat: {
    type: Number,
    required: true,
  },
  BMI: {
    type: Number,
    required: true,
  },
  BldPressure: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
  WeightProgress: {
    type: Number,
    required: true,
  },
  bFatProgress: {
    type: Number,
    required: true,
  },
  hRateProgress: {
    type: Number,
    required: true,
  },
  bmiProgress: {
    type: Number,
    required: true,
  },
});

const FitnessLog = mongoose.model("Fitness_Log ", fitnessLogSchema);
module.exports = FitnessLog;
