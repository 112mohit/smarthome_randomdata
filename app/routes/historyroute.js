'use strict';
var passport = require('passport');

module.exports = function (app) {
    // Root routing
    var history = require('../../app/controllers/historycontroller');

    var middleware = passport.authenticate('jwt', { session: false });
    app.get("/api/history/:room/:date", middleware, history.getHistoryData);

};