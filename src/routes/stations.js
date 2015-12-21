'use strict';

var router = require('express').Router();

var apiService = require('../services/api');

router.get('/:city_name/stations/:station_id', function (req, res) {
    apiService.getStation(req.params.city_name, req.params.station_id, function (error, station) {
        if (error) {
            res.status(500).end();
        } else {
            res.json(station);
        }
    });
});

router.get('/:city_name/stations', function (req, res) {
    apiService.getStationsByCity(req.params.city_name, function (error, stations) {
        if (error) {
            res.status(500).end();
        } else {
            res.json(stations);
        }
    });
});

module.exports = router;
