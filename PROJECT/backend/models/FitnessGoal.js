const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fitnessGoalSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  currentheight: {
    type: Number,
    required: true,
  },
  currentBodyfat: {
    type: Number,
    required: true,
  },
  CurrentBMI: {
    type: Number,
    required: true,
  },
  currentBldPressure: {
    type: Number,
    required: true,
  },
  idealWeight: {
    type: Number,
    required: true,
  },
  idealBodyfat: {
    type: Number,
    required: true,
  },
  idealBMI: {
    type: Number,
    required: true,
  },
  idealBldPressure: {
    type: Number,
    required: true,
  },
});

const FitnessGoal = mongoose.model("Fitness_Goal ", fitnessGoalSchema);
module.exports = FitnessGoal;
