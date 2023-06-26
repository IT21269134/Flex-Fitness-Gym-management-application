const router = require("express").Router();
let breakfast = require("../../../models/nutrition_models/breakfast");

//create ~ http://localhost:4000/breakfast/createfooddiary
router.route("/createfooddiary").post((req, res) => {
  const food_name = req.body.food_name;
  const calories = req.body.calories;
  const totalFat = req.body.totalFat;
  const totalCarb = req.body.totalCarb;
  const totalProtein = req.body.totalProtein;

  const newBreakfast = new breakfast({
    food_name,
    calories,
    totalFat,
    totalCarb,
    totalProtein,
  });

  newBreakfast
    .save()
    .then(() => {
      res.json("Nutrition Data Added Successfully!!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//read ~ http://localhost:4000/breakfast/counter
router.route("/counter").get((req, res) => {
  //fetching all the nutrition data
  breakfast
    .find()
    .then((brekafastData) => {
      res.json(brekafastData);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update ~ http://localhost:4000/breakfast/counterupdate/idcomeshere
router.route("/counterupdate/:id").put(async (req, res) => {
  let foodId = req.body.id;
  //destructor method
  const { food_name, calories, totalFat, totalCarb, totalProtein } = req.body;

  const updateBreakfast = {
    food_name,
    calories,
    totalFat,
    totalCarb,
    totalProtein,
  };

  //checking whether theres a record
  const update = await breakfast
    .findByIdAndUpdate(foodId, updateBreakfast)
    .then(() => {
      res.status(200).send({ status: "Food Nutrition Data Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete ~ http://localhost:4000/breakfast/delete/idcomeshere
router.route("/delete/:id").delete(async (req, res) => {
  let foodId = req.params.id;
  await breakfast
    .findByIdAndDelete(foodId)
    .then(() => {
      res.status(200).send({ status: "Nutrition Data Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

module.exports = router;
