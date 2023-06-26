//require files
const  Payment  = require('./Payment')
module.exports = (app) => {
 
    app.use('/api',Payment)

    }