const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutLogSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
});

const WorkoutLogD = mongoose.model("workout_log ", WorkoutLogSchema);
module.exports = WorkoutLogD;
