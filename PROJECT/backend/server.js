require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const inventory_base = require('./routes/inventory/inventory_base')
const customer_base = require('./routes/customer/customer_base')
const doctor_base = require('./routes/doctor/doctor_base')
const fitness_base = require('./routes/fitness/fitness_base')
const nutrition_base = require('./routes/nutrition/nutrition_base')
const onlineshop_base = require('./routes/onlineshop/onlineshop_base')
const payment_base = require('./routes/payment/payment_base')
const trainer_base = require('./routes/trainer/trainer_base')

//express app
const app = express();


//middleware
app.use(express.json())//to add json to the 'req' Object

app.use((req, res,next)=>{
    console.log(req.path, req.method)
    next()
})

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(morgan('dev'));//to run frontend and backend concurrently 
app.use(bodyParser.json());
app.use(cors());



//routes
inventory_base(app)
customer_base(app)
doctor_base(app)
fitness_base(app)
nutrition_base(app)
onlineshop_base(app)
payment_base(app)
trainer_base(app)



//connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 