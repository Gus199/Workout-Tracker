 //create routers for the app routes
 const router = require('express').Router();
//  const apiRoutes = require('./api');
 const homeRoutes = require('./homeroutes');
 const apiRoutes = require('./api');
 
 
 router.use('/api', apiRoutes);
 router.use('/', homeRoutes);
 
 
 module.exports = router;