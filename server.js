'use strict';

var express = require('express');
var blocked = require('blocked');

var app = express();
var citiesRoutes = require('./src/routes/cities');

var databasePopulatorService = require('./src/services/database-populator');

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

app.use('/api', citiesRoutes);

app.use('/', express.static('public'));

app.listen(8080, function () {
    console.info('Server running on port 8080.');
    databasePopulatorService.start();
});

blocked(function (ms) {
  console.log('BLOCKED FOR %sms', ms | 0);
});
