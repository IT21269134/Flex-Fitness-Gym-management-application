//require files
const seedRouter = require('./seedRoutes')
const productRouter= require('./productRoutes')
const  userRouter  = require('./UserRoutes')
module.exports = (app) => {
  app.use('/api/orders' , seedRouter)
  app.use('/api/products' , productRouter)
  app.use('/api/users',userRouter)

  }