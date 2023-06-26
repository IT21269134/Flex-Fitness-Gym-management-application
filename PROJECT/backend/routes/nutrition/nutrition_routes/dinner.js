const router = require("express").Router();
let dinner = require("../../../models/nutrition_models/dinner");

//create ~ http://localhost:4000/dinner/createfooddiary
router.route("/createfooddiary").post((req, res) => {
  const food_name = req.body.food_name;
  const calories = req.body.calories;
  const totalFat = req.body.totalFat;
  const totalCarb = req.body.totalCarb;
  const totalProtein = req.body.totalProtein;

  const newDinner = new dinner({
    food_name,
    calories,
    totalFat,
    totalCarb,
    totalProtein,
  });

  newDinner
    .save()
    .then(() => {
      res.json("Nutrition Data Added Successfully!!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//read ~ http://localhost:4000/dinner/counter
router.route("/counter").get((req, res) => {
  //fetching all the nutrition data
  dinner
    .find()
    .then((dinnerData) => {
      res.json(dinnerData);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update ~ http://localhost:4000/dinner/counterupdate/idcomeshere
router.route("/counterupdate/:id").put(async (req, res) => {
  let foodId = req.body.id;
  //destructor method
  const { food_name,calories, totalFat, totalCarb, totalProtein } = req.body;

  const updateDinner = {
    food_name,
    calories,
    totalFat,
    totalCarb,
    totalProtein,
  };

  //checking whether theres a record
  const update = await dinner
    .findByIdAndUpdate(foodId, updateDinner)
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

//delete ~ http://localhost:4000/dinner/delete/idcomeshere
router.route("/delete/:id").delete(async (req, res) => {
  let foodId = req.params.id;
  await dinner
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
