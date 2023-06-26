const DoctorRoutes = require('./DoctorRoutes');

module.exports = (app) => {
  app.use('/api/doctor', DoctorRoutes);

  }