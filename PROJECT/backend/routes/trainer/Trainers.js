//import pacakge Router in express
const router = require("express").Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const AWS = require("aws-sdk");

//models check
let Coach = require("../../models/UserModel");

// S3 bucket Credintials
const s3 = new AWS.S3({
  accessKeyId: "AKIA6H2NBN6UTKXN5R4H",
  secretAccessKey: "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",
  region: "us-east-1",
});

//Photo uploading
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Registration
router.post("/TrainerReg", upload.single("photo"), async (req, res) => {
  const age = parseInt(req.body.age);
  const num = parseInt(req.body.number);
  const photoPath = req.body.file;
  const isAdmin = false;
  const isCoach = true;
  const isDoctor = false;
  const isCustomer = false;

  let salt = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(req.body.password, salt);

  const uploadedImage = await s3
    .upload({
      Bucket: "flexfitness-coach-img",
      Key: req.file.originalname,
      Body: req.file.buffer,
    })
    .promise();

  //obj creation
  const newCoach = new Coach({
    name: req.body.name,
    age: age,
    email: req.body.email,
    num: num,
    description: req.body.description,
    password: password,
    photo: uploadedImage.Location,
    isAdmin: isAdmin,
    isCoach: isCoach,
    isDoctor: isDoctor,
    isCustomer: isCustomer,
  });

  //obj send to database
  const existingUser = await Coach.findOne({ email: req.body.email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Username or email already exists" });
  } else {
    await newCoach
      .save()
      .then(() => {
        //response
        res.send("Trainer Added");
      })
      .catch((err) => {
        console.log(err);
        res.send("Error Registration");
      });
  }
});

//fetch All Trainer Data
router.route("/TrainerAD").get((req, res) => {
  Coach.find({ isCoach: true })
    .then((coaches) => {
      res.json(coaches);
    })
    .catch((err) => {
      console.log(err);
    });
});
//fetch All user names
router.route("/usernames").get((req, res) => {
  Coach.find({ isCustomer: true })
    .select("name")
    .then((coaches) => {
      const coachNames = coaches.map((coach) => coach.name);
      res.json(coachNames);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

//export
module.exports = router;
