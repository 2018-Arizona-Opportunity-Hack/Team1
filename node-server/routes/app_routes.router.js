var express = require('express');
var router = express.Router()

var BasicPostRoutes = require('./basic_post.routes');

router.use('/main-post', BasicPostRoutes);

module.exports = router;