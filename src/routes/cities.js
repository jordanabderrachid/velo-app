'use strict';

var router = require('express').Router();

var stationsRoutes = require('./stations');
var apiService = require('../services/api');

router.get('/cities', function (req, res) {
    apiService.getCities(function (error, data) {
        if (error) {
            res.status(500).end();
        } else {
            var cities = [];
            
            data.forEach(function (city) {
                cities.push(city.name);
            });

            res.json(cities);
        }
    });
});

router.use('/cities', stationsRoutes);

module.exports = router;
