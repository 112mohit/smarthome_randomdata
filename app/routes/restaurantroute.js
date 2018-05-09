'use strict';
var passport = require('passport');

module.exports = function (app) {
    // Root routing
    var restaurant = require('../../app/controllers/restaurantcontroller');

    var middleware = passport.authenticate('jwt', { session: false });
    app.post("/api/restaurant/:table/:type/:on", middleware, restaurant.toggleLight);

};