//require files
const breakfastRouter = require ('./nutrition_routes/breakfast')
const lunchRouter = require ('./nutrition_routes/lunch')
const dinnerRouter = require ('./nutrition_routes/dinner')

module.exports = (app) => {

//http://localhost:4000/breakfast
app.use("/breakfast",breakfastRouter);

//http://localhost:4000/lunch
app.use("/lunch",lunchRouter);

//http://localhost:4000/dinner
app.use("/dinner",dinnerRouter);
  }