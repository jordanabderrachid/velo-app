'use strict';

var router = require('express').Router();

var apiService = require('../services/api');

router.get('/stations/:station_id', function (req, res) {
    apiService.getStation(req.params.station_id, function (error, station) {
        if (error) {
            res.status(500).end();
        } else {
            res.json(station);
        }
    });
});

router.get('/stations', function (req, res) {
    apiService.getStations(function (error, stations) {
        if (error) {
            res.status(500).end();
        } else {
            res.json(stations);
        }
    });
});

module.exports = router;
