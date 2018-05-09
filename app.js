'use strict';

var dotenv = require('dotenv').config();
var config = require('./config/config');
var mongoose = require('mongoose');
var _ = require('lodash');
var glob = require('glob');
// Bootstrap db connection

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
});


// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Smart Home application started on port ' + config.port);