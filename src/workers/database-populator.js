'use strict';

var debug = require('debug')('worker');

var apiService = require('../services/api');

apiService.getStations(function (error, stations) {
    if (error) {
        console.error('An error occured while fetching stations in the worker. [%s]', error.message);
        process.exit(1);
    } else {
        debug('Worker fetched %d stations. %s', stations.length, new Date().toISOString());
        process.exit();
    }
});
