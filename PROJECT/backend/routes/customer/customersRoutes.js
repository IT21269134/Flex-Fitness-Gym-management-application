const express = require("express");
const userRouter = express.Router();
const customerModel = require("../../models/UserModel");

// import all controllers
const controller = require("../../controllers/customerController");
const regMail = require("../../controllers/customerMailer");

// POST method;
userRouter.route("/register").post(controller.register); // register user
userRouter.route("/registerMail").post(regMail.registerMail); // send the mail
userRouter
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
userRouter.route("/login").post(controller.verifyUser, controller.login); //login in app

//GET methods
userRouter.route("/user/:username").get(controller.getUser); // user with username
userRouter
  .route("/generateOTP")
  .get(controller.verifyUser, controller.localVariables); //generate random OTP

//PUT methods
userRouter.route("/updateUser/:id").patch(controller.updateUser); //use to update the user profile

//DELETE method
userRouter.route("/Customer_Dashboard").get((req, res) => {
  customerModel
    .find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete customer
userRouter.route("/delete/:id").delete(async (req, res) => {
  let id = req.params.id;

  await customerModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with User deletion", error: err.message });
    });
});

userRouter.route("/dashboard").post();

module.exports = userRouter;
