//require files
const morgan = require("morgan");
const router = require("../customer/customersRoutes");

module.exports = (app) => {
  // app.use(morgan("tiny"));
  // app.disable("x-powered-by"); //less hackers know about our stack

  /*api routes*/
  app.use("/api", router);
  // app.get("/", (req, res) => {
  //   // res.set({
  //   //   "Allow-access-Allow-origin": "*",
  //   // });
  // });
};
