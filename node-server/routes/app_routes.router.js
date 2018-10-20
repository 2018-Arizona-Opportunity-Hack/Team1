var express = require('express');
var router = express.Router()
var CSVRoutes = require('./csv_routes.routes');

router.use('/csv', CSVRoutes);

module.exports = router;