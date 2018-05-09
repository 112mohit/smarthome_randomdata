'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var SensorSchema = new Schema({
    room: {
        type: String,
        trim: true,
        required: 'Please enter room',
    },
    temperature: {
        type: Number,
        required: 'Please enter temperature'
    },
    humidity: {
        type: Number,
        required: 'Please enter humidity'
    },
    isValid: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});


mongoose.model('Sensor', SensorSchema);