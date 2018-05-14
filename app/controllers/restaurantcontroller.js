'use strict';

var path = require('path');
// var gpio = require('rpi-gpio');
var gpio = { setup: function () { } };

var types = {
    table1: {
        'starter': 7,
        'maincourse': 8,
        'dessert': 9
    },
    table2: {
        'starter': 7,
        'maincourse': 8,
        'dessert': 9
    }
}

//Gpio's used on the raspberry pi
gpio.setup(types.table1.starter, gpio.DIR_OUT);
gpio.setup(types.table1.maincourse, gpio.DIR_OUT);
gpio.setup(types.table1.dessert, gpio.DIR_OUT);
gpio.setup(types.table2.starter, gpio.DIR_OUT);
gpio.setup(types.table2.maincourse, gpio.DIR_OUT);
gpio.setup(types.table2.dessert, gpio.DIR_OUT);

//For Handle Errors
function handleError(res, message) {
    res.status(500).json({
        "error": message
    });
}

//Pushing True on GPIO associated with type
exports.toggleLight = function (req, res) {
    var typePin = types[req.params.table][req.params.type];
    var on = req.params.on == 'true';
    res.status(200).json(req.params.type + ' is now ' + (on ? 'getting ready' : 'on hold'));

    // for (var key in types[req.params.table]) {
    //     if (key !== req.params.type) {
    //         var pin = types[req.params.table][req.params.type];
    //         gpio.write(pin, false, function (err) { });
    //     }
    // }
    // gpio.write(typePin, on, function (err) {
    //     if (err) {
    //         handleError(res, 'Error');
    //     };
    //     res.status(200).json(req.params.type + ' is now ' + (on ? 'on' : 'off'));
    // });

};
