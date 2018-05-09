'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');


var validateLocalStrategyPassword = function (password) {
    return (password && password.length > 6);
};

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: ''
    },
    username: {
        type: String,
        unique: 'username should be unique',
        required: 'Please fill in a username',
        trim: true
    },
    emailId: {
        type: String,
        required: 'Please fill in a emailId',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    updated: {
        type: Date
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

UserSchema.pre('save', function (next) {
    if (this.password && this.password.length > 6) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

UserSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

mongoose.model('User', UserSchema);