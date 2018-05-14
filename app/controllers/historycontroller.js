
var mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor');

//  var gpio = require('rpi-gpio');
//  var sensorLib = require("node-dht-sensor");
var gpio = { setup: function () { } };

//Gpio's used on the raspberry pi
gpio.setup(8, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);
gpio.setup(13, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT);

//reading data from the sensor
var sensor1 = {
    sensors: [{
        name: 'room1',
        text: "Room 1",
        type: 11,
        pin: 5
    }, {
        name: 'room2',
        text: "Room 2",
        type: 11,
        pin: 6
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

//Min-Max random data
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Random data
var sensorsData = [{
    "sensor": { "name": "room1", "type": 11, "pin": 18 },
    "readData": { "humidity": getRandomInt(0, 100), "temperature": getRandomInt(15, 35), "isValid": true, "errors": 0 }
}, {
    "sensor": { "name": "room2", "type": 11, "pin": 18 },
    "readData": { "humidity": getRandomInt(0, 100), "temperature": getRandomInt(15, 35), "isValid": true, "errors": 0 }
}]

//Initialising the charts
exports.getHistoryData = function (req, res) {
    var room = req.params.room;
    var date = req.params.date;
    var prevDate = new Date(date).setDate(new Date(date).getDate() - 1);
    var nextDate = new Date(date).setDate(new Date(date).getDate() + 1);

    Sensor.find({
        'room': room,
        'created': { "$gte": prevDate, "$lt": nextDate }
    }, function (err, result) {
        if (err) return res.status(500).json('Error on the server.');
        res.json(result);
    });
};

//AC and heating switch on off
function setData(room, ac, heater) {
    var roomPin = room === 'room1' ? 8 : 13;
    gpio.write(roomPin, ac, function (err) { });
    var roomPin1 = room === 'room1' ? 11 : 16;
    gpio.write(roomPin1, heater, function (err) { });

}
//Adding data
function addSensorData(room) {
    var result = {};
    //result = sensor1.read(room);

    for (var item in sensorsData) {
        if (sensorsData[item].sensor.name === room) {
            var temp = sensorsData[item];
            temp.readData.humidity = getRandomInt(0, 100);
            temp.readData.temperature = getRandomInt(15, 35);
            result = temp;
        }
    }

    // if (result.readData.temperature > 25) {
    //     setData(room, true, false);
    // } else if (result.readData.temperature < 17) {
    //     setData(room, false, true);
    // }

    var sensor = new Sensor({
        room: room,
        temperature: result.readData.temperature,
        humidity: result.readData.humidity,
        isValid: result.readData.isValid
    });
    sensor.save(function (error, result) { });

}
//Time
setInterval(function () {
    addSensorData('room1');
    addSensorData('room2');
}, (60000 * 10));
