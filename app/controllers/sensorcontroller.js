'use strict';

var path = require('path');
// var gpio = require('rpi-gpio');
// var sensorLib = require("node-dht-sensor");
var gpio = { setup: function () { } };

//Gpio's used on the raspberry pi
gpio.setup(7, gpio.DIR_OUT);
gpio.setup(8, gpio.DIR_OUT);
gpio.setup(10, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);
gpio.setup(12, gpio.DIR_OUT);
gpio.setup(13, gpio.DIR_OUT);
gpio.setup(15, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT);

//For Handle Errors
function handleError(res, message) {
    res.status(500).json({
        "error": message
    });
}


var sensor = {
    sensors: [{
        name: 'room1',
        text: "Room 1",
        type: 11,
        pin: 27
    }, {
        name: 'room2',
        text: "Room 2",
        type: 11,
        pin: 22
    }],
    read: function (room) {
        for (var item in this.sensors) {
            if (this.sensors[item].name === room) {
                var data = sensorLib.read(this.sensors[item].type, this.sensors[item].pin);
                return {
                    sensor: this.sensors[item],
                    readData: data
                };
            }
        }
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var sensorsData = [{
    "sensor": { "name": "room1", "type": 11, "pin": 18 },
    "readData": { "humidity": getRandomInt(0, 100), "temperature": getRandomInt(15, 35), "isValid": true, "errors": 0 }
}, {
    "sensor": { "name": "room2", "type": 11, "pin": 18 },
    "readData": { "humidity": getRandomInt(0, 100), "temperature": getRandomInt(15, 35), "isValid": true, "errors": 0 }
}]

exports.getSensorData = function (req, res) {
    var room = req.params.room;
    // res.json(sensor.read(room));


    //Random for the app to work without raspberry pi 
    for (var item in sensorsData) {
        if (sensorsData[item].sensor.name === room) {
            var temp = sensorsData[item];
            temp.readData.humidity = getRandomInt(0, 100);
            temp.readData.temperature = getRandomInt(15, 35);
            res.status(200).json(temp);
        }
    }

};

//Pushing True on GPIO 7/12 to Switch on/off the Room1/Room2 Light
exports.setRoomLight = function (req, res) {
    var roomPin = req.params.room === 'room1' ? 7 : 12;
    var on = req.params.on == 'true';
     res.status(200).json('LED is now ' + (on ? 'on' : 'off'));
    // gpio.write(roomPin, on, function (err) {
    //     if (err) {
    //         handleError(res, 'Error');
    //     };
    //     res.status(200).json('LED is now ' + (on ? 'on' : 'off'));
    // });
};

//Pushing True on GPIO 8/13 to Switch on/off the Room1/Room2 AC
exports.setRoomAc = function (req, res) {
    var roomPin = req.params.room === 'room1' ? 8 : 13;
    var on = req.params.on == 'true';
    res.status(200).json('TV is now ' + (on ? 'on' : 'off'));
    // gpio.write(roomPin, on, function (err) {
    //     if (err) {
    //         handleError(res, 'Error');
    //     };
    //     res.status(200).json('TV is now ' + (on ? 'on' : 'off'));
    // });
};

//Pushing True on GPIO 10/15 to Switch on/off the Room1/Room2 TV
exports.setRoomTV = function (req, res) {
    var roomPin = req.params.room === 'room1' ? 10 : 15;
    var on = req.params.on == 'true';
    res.status(200).json('TV is now ' + (on ? 'on' : 'off'));
    // gpio.write(roomPin, on, function (err) {
    //     if (err) {
    //         handleError(res, 'Error');
    //     };
    //     res.status(200).json('TV is now ' + (on ? 'on' : 'off'));
    // });
};

//Pushing True on GPIO 8/13 to Switch on/off the Room1/Room2 Heating
exports.setRoomHeating = function (req, res) {
    var roomPin = req.params.room === 'room1' ? 11 : 16;
    var on = req.params.on == 'true';
    res.status(200).json('Heating is now ' + (on ? 'on' : 'off'));
    // gpio.write(roomPin, on, function (err) {
    //     if (err) {
    //         handleError(res, 'Error');
    //     };
    //     res.status(200).json('Heating is now ' + (on ? 'on' : 'off'));
    // });
};

