'use strict';
var _ = require('lodash'),
    glob = require('glob');
module.exports = {
    app: {
        title: 'smartauto',
        description: 'smarthome automation',
        keywords: 'smartauto'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://112mohit:112mohit@ds119150.mlab.com:19150/randomdatasmarthome',
    //db: 'mongodb://localhost/smarthome',
    secret: 'smarthometoken',
    adminUser: {
        username: 'admin',
        password: 'admin@123',
        roles: ['admin'],
        emailId: 'admin@admin.com'
    }
};

module.exports.getGlobbedFiles = function (globPatterns, removeRoot) {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, function (err, files) {
                if (removeRoot) {
                    files = files.map(function (file) {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            });
        }
    }

    return output;
};
