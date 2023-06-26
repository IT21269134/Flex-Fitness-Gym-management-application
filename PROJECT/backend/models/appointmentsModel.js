const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    doctorId: {
      type: String,
      required: true,
    },

    doctorInfo: {
      type: Object,
      required: true,
    },

    userDes: {
        type: Object,
        required: true,
      },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model(
  "Doctor_Appointments",
  appointmentSchema
);
module.exports = appointmentModel;
