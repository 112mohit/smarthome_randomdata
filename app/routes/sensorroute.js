'use strict';
var passport = require('passport');

module.exports = function (app) {
    // Root routing
    var sensor = require('../../app/controllers/sensorcontroller');

    var middleware = passport.authenticate('jwt', { session: false });
    app.get("/api/sensordata/:room", middleware, sensor.getSensorData);
    app.post("/api/light/:room/:on", middleware, sensor.setRoomLight);
    app.post("/api/ac/:room/:on", middleware, sensor.setRoomAc);
    app.post("/api/tv/:room/:on", middleware, sensor.setRoomTV);
    app.post("/api/heating/:room/:on", middleware, sensor.setRoomHeating);

};