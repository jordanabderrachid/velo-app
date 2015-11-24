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
    // Allow CORS.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', stationsRoutes);

app.use('/', express.static('public'));

app.listen(8080, function () {
    console.info('Server running on port 8080.');
});
