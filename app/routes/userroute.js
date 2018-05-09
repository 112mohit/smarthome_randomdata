'use strict';

var passport = require('passport');

module.exports = function (app) {
    // User Routes
    var users = require('../../app/controllers/usercontroller');
    var middleware = passport.authenticate('jwt', { session: false });

    // Setting up the users profile api
    app.get('/api/me', middleware, users.me);
    app.get('/api/user', middleware, users.getUserList);
    app.put('/api/user/:id', middleware, users.updateUser);
    app.delete('/api/user/:id', middleware, users.deleteUser);
    app.post('/api/user', middleware, users.createUser);

    app.post('/api/changepassword', middleware, users.changePassword);

    //login, registration, logut
    app.route('/api/auth/signin').post(users.signin);
    app.route('/api/auth/signout').get(users.signout);


    app.route('/api/setup').get(users.setup);

};
