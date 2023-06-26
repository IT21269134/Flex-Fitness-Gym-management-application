const itemRoutes = require('./items')

module.exports = (app) => {
    app.use('/api/items', itemRoutes);
  
  }



  // use this code format in your base file