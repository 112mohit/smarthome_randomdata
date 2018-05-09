'use strict';


var passport = require('passport'),
	User = require('mongoose').model('User'),
	passport = require("passport"),
	passportJWT = require("passport-jwt"),
	config = require('../config');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	User.findOne({
		username: jwt_payload.user.username
	}, function (err, user) {
		if (err) {
			return next(err, false);
		}
		if (user) {
			return next(null, user);
		} else {
			return next(null, false);
			// or you could create a new account
		}
	});
});

module.exports = function () {
	// Use local strategy
	passport.use(strategy);
};