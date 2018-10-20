// API for handling basic post functionality

var express = require('express')
var router = express.Router()

var CSVRoutesController = require('../controller/csv_routes.controller');

// ========================== CRUD ==========================

// Create
router.get('/basic-post', CSVRoutesController.ReadBasicPosts);

// Delete
router.post('/basic-post', CSVRoutesController.CreateBasicPosts);

// CSV Upload
router.post('/upload-csv', CSVRoutesController.UploadCSV);

module.exports = router;