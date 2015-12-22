'use strict';

var debug = require('debug')('worker');

var apiService = require('../services/api');
var databaseService = require('../services/database');

apiService.getStations(function (error, stations) {
    if (error) {
        console.error('An error occured while fetching stations in the worker. [%s]', error.message);
        process.exit(1);
    } else {
        debug('Worker fetched %d stations. %s', stations.length, new Date().toISOString());

        var points = [];
        stations.forEach(function (station) {
            var point = [];

            var values = {
                available_bike_stands: station.available_bike_stands,
                available_bikes: station.available_bikes,
                bike_stands: station.bike_stands,
                status: station.status.toLowerCase()
            }

            var tags = {
                city: station.contract_name.toLowerCase(),
                number: new String(station.number),
                lat: new String(station.position.lat),
                lng: new String(station.position.lng)
            }

            point.push(values);
            point.push(tags);

            points.push(point);
        });

        databaseService.persistStations(points, function (error) {
            if (error) {
                console.error('An error occured while persisting the stations. [%s]', error.message);
                process.exit(1);
            }

            debug('Worker persisted %d stations.', points.length);
            process.exit();
        });
    }
});
