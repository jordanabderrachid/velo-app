'use strict';

var express = require('express');

var app = express();
var stationsRoutes = require('./src/routes/stations');

if (!process.env['BIKE_API_KEY']) {
    console.warn('WARNING : The environment variable $BIKE_API_KEY is not configured.');
} else {
    console.log('The $BIKE_API_KEY is ' + process.env['BIKE_API_KEY']);
}

app.use('/api', function (req, res, next) {
    // Allow CORS and set the proper content-type header.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.use('/api', stationsRoutes);

app.listen(8080, function () {
    console.info('Server running on port 8080.');
});
