'use strict';

var fs = require('fs'),
    http = require('http'),
    //https = require('https'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    passport = require('passport'),
    flash = require('connect-flash'),
    config = require('./config'),
    path = require('path');

module.exports = function (db) {
    // Initialize express app
    var app = express();

    config.getGlobbedFiles('./app/models/**/*.js').forEach(function (modelPath) {
        require(path.resolve(modelPath));
    });

    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;

    // Passing the request url to environment locals
    //app.use(function (req, res, next) {
    //    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    //    next();
    //});

    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.set('showStackError', true);
    // app.set('view engine', 'html');
    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(cookieParser());


    app.use(passport.initialize());
    //app.use(passport.session());

    app.use(flash());

    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    app.use(express.static(path.resolve('./dist')));

    app.use(function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'authorization,Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    app.use(function (err, req, res, next) {
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).json('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.sendFile(path.resolve("./" + 'dist/index.html'));
    });

    //if (process.env.NODE_ENV === 'secure') {
    //    // Log SSL usage
    //    console.log('Securely using https protocol');

    //    // Load SSL key and certificate
    //    var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
    //    var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

    //    // Create HTTPS Server
    //    var httpsServer = https.createServer({
    //        key: privateKey,
    //        cert: certificate
    //    }, app);

    //    // Return HTTPS server instance
    //    return httpsServer;
    //}

    // Return Express server instance
    return app;
};