'use strict';

var router = require('express').Router();

var stationsRoutes = require('./stations');
var databaseService = require('../services/database');

router.get('/cities', function (req, res) {
    databaseService.getCities(function (error, data) {
        if (error) {
            res.status(500).end();
            return;
        }

        if (!data || data.length === 0 || data[0].length === 0) {
            res.status(204).end();
            return;
        }

        var cities = [];
        data[0].forEach(function (city) {
            cities.push(city.city);
        });

        res.json(cities);
    });
});

router.use('/cities', stationsRoutes);

module.exports = router;
