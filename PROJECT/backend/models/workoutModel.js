const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//workout schema
const WorkoutSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  coachername: {
    type: String,
    required: false,
  },

  sheduleno: {
    type: String,
    required: false,
  },

  date: {
    type: String,
    required: false,
  },
  set1: {
    type: String,
    required: false,
  },
  set2: {
    type: String,
    required: false,
  },
  set3: {
    type: String,
    required: false,
  },
  set4: {
    type: String,
    required: false,
  },
  set5: {
    type: String,
    required: false,
  },
  set6: {
    type: String,
    required: false,
  },
  set7: {
    type: String,
    required: false,
  },
  set8: {
    type: String,
    required: false,
  },
  set9: {
    type: String,
    required: false,
  },
  set10: {
    type: String,
    required: false,
  },
});

const workout = mongoose.model("Workout", WorkoutSchema);

//export module
// module.exports = {Coach,validate};
module.exports = workout;
