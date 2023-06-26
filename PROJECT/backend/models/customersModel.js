const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide unique Username"],
    unique: [true, "Username Exists"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },

  email: {
    type: String,
    require: [true, "Please provide a unique email"],
    unique: [true, "Already an account is exists with email"],
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  phone: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
  },

  profile: {
    type: String,
  },
});

const User = mongoose.model("UserR", userSchema) || mongoose.model.Users;
module.exports = User;
