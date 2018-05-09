'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    config = require('../../config/config'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');

//For Handle Errors
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}

exports.createUser = function (req, res) {
    // For security measurement we remove the roles from the req.body object
    var user = new User(req.body);
    var message = null;
    user.provider = 'local';

    // Then save the user 
    user.save(function (err) {
        if (err) {
            handleError(res, err.message, 'Error in user saving', 500);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            res.json(user);
        }
    });
};

exports.signin = function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).json('Error on the server.');
        if (!user) return res.status(404).json('Invalid username or password.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).json('Invalid username or password');
        var payload = { user: user };
        var token = jwt.sign(payload, config.secret);
        res.json({ auth: true, token: token });
    });
};

exports.updateUser = function (req, res) {
    var userData = req.body;
    var userId = req.params.id;
    User.findOne({ '_id': userId }, function (err, user) {
        if (err) return res.status(500).json('Error on the server.');
        if (!user) return res.status(404).json('No user found.');
        user.emailId = req.body.emailId;
        user.name = req.body.name;
        user.save(function (err) {
            if (err) {
                handleError(res, err.message, 'Error while changing password', 500);
            } else {
                res.json('User Updated Successfully.');
            }
        });
    });
};

exports.deleteUser = function (req, res) {
    var userId = req.params.id;
    User.findById(userId, function (err, user) {
        if (err) return res.status(500).json('Error on the server.');
        if (!user) return res.status(404).json('No user found.');
        user.remove(function (err) {
            if (err) {
                handleError(res, err.message, 'Error while changing password', 500);
            } else {
                res.json('User removed Successfully.');
            }
        });
    });
};

exports.changePassword = function (req, res) {
    var passwordData = req.body;
    User.findOne({ username: req.user.username }, function (err, user) {
        if (err) return res.status(500).json('Error on the server.');
        if (!user) return res.status(404).json('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (!passwordIsValid) return res.status(404).json('Invalid Old Password');

        user.passport = req.body.newPassword;
        user.save(function (err) {
            if (err) {
                handleError(res, err.message, 'Error while changing password', 500);
            } else {
                res.json('Password Updated Successfully.');
            }
        });
    });
};

exports.getUserList = function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).json('Error on the server.');
        res.json(users);
    });
};

exports.signout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};

exports.me = function (req, res) {
    res.status(200).json(req.user);
}

exports.setup = function (req, res) {
    var user = new User(config.adminUser);
    user.provider = 'local';
    User.findOne({
        username: user.username
    }, function (err, result) {
        if (result) {
            res.json(result);
        }
        // Then save the user 
        user.save(function (err) {
            if (err) {
                handleError(res, err.message, 'Error in setup', 500);
            }
            res.json(user);
        });
    });
}
