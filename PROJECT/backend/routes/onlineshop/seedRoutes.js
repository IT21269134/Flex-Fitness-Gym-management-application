const express = require("express");

const { setproducts } = require("../../controllers/seedController.js");

const seedRouter = express.Router();
seedRouter.post("/", setproducts);

module.exports = seedRouter;
