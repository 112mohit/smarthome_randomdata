'use strict';

module.exports = function (app) {
    // Root routing
    var core = require('../../app/controllers/corecontroller');
    app.route('/').get(core.index);

    // app.route('/*').get(core.index);

};