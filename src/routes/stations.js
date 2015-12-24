'use strict';

var router = require('express').Router();

var apiService = require('../services/api');
var databaseService = require('../services/database');

router.get('/:city_name/stations/:station_id', function (req, res) {
    databaseService.getLatestStation(req.params.city_name, req.params.station_id, function (error, result) {
        if (error) {
            res.status(500).end();
            return;
        }

        if (!result || result.length === 0 || result[0].length === 0) {
            res.status(204).end();
            return;
        }

        var station = {
            number: result[0][0].number,
            position:  {
                lat: result[0][0].lat,
                lng: result[0][0].lng
            },
            status: result[0][0].status,
            city: result[0][0].city,
            bike_stands: result[0][0].bike_stands,
            available_bike_stands: result[0][0].available_bike_stands,
            available_bikes: result[0][0].available_bikes,
            last_update: result[0][0].time
        };

        res.json(station);
    });
});

router.get('/:city_name/stations', function (req, res) {
    databaseService.getLatestStations(req.params.city_name, function (error, results) {
        if (error) {
            res.status(500).end();
            return;
        }

        if (!results || results.length === 0 || results[0].length === 0) {
            res.status(204).end();
            return;
        }

        var stations = [];
        results[0].forEach(function (result) {
            var station = {
                number: result.number,
                position:  {
                    lat: result.lat,
                    lng: result.lng
                },
                status: result.status,
                city: result.city,
                bike_stands: result.bike_stands,
                available_bike_stands: result.available_bike_stands,
                available_bikes: result.available_bikes,
                last_update: result.time
            };
            stations.push(station);
        });

        res.json(stations);
    });
});

module.exports = router;
