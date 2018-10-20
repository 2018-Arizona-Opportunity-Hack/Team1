// dependencies:
var bluebird = require('bluebird')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var busboy = require('connect-busboy');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./sqllite_db/appdb.db');

// set the root directory
var app = express();

// set up the sql server:
db.serialize(function() {
  console.log("SQLLite server succssfully started");
});

// Disable CORS since our app is on a separate domain (port 8001)
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy());

// Example url:
//http://localhost:8000/api/main-post/basic-post

// Route setup
var mainApi = require('./routes/app_routes.router');
app.use('/api', mainApi);

var port = (process.env.PORT || 8000);
app.listen(port);

console.log("server running on port 8000");

module.exports = app;