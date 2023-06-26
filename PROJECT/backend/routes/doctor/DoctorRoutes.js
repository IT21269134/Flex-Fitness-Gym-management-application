const express = require("express");
const router = express.Router();
const multer = require("multer");
// const Doctor = require("../../models/UserModel");
// const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const {
  DoctorRegisterCtrl,
  getAllDoctorsController,
  getDoctorInfoByDoctorIdController,
  bookAppointmentByUserController,
  updateDoctorProfile,
  bookingAvailabilityController,
  getAppointmentListController,
  changeAppointmentStatusController,
  getDoctorAppointmentByIdController,
  deleteDoctorController,
  deleteAppointmentController,
} = require("../../controllers/doctorControllers");

const s3 = new AWS.S3({
  accessKeyId: "AKIA6H2NBN6UUJVQXS5R",
  secretAccessKey: "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",
  region: "us-east-1",
});
//REGISTER || POST
//photo uploading
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/register_doctor", upload.single("photo"), DoctorRegisterCtrl);

//update Doctor Information
router.post("/updateDoctorInfo", upload.single("photo"), updateDoctorProfile); // need authmiddleware

// router.post("/updateDoctorInfo", upload.single("photo"), 


//delete doctor profile
router.delete("/deleteDoctorProfile/:id", deleteDoctorController);

//GET DOCTORS FOR CARDS || GET
router.get("/getDoctorsForCards", getAllDoctorsController); // need authmiddleware

//getting Doctor Information || POST
router.get("/getDoctorInfoById/:doctorId", getDoctorInfoByDoctorIdController); // need authmiddleware

//book appointment by user || POST
router.post("/bookAppointmentByUser", bookAppointmentByUserController); // need authmiddleware

//booking availability
router.post("/checkBookingAvailability", bookingAvailabilityController); // need authmiddleware

// getting appointments List by user id
router.get("/getAppointmentsByUserId/:_id", getAppointmentListController);

// getting appointments List by doctor id
router.get("/getAppointmentsByDoctorId/:_id", getDoctorAppointmentByIdController);

//GET METHOD || DOCTORSCHANGESTATUS
router.post('/changeAppointmentStatus', changeAppointmentStatusController);

//delete appointment
router.delete("/deleteAppointmentsByUserId/:_id", deleteAppointmentController);

module.exports = router;
