'use strict';

var apiService = require('../services/api');

apiService.getStations(function (error, stations) {
    if (error) {
        console.error('An error occured while fetching stations in the worker. ' + error.message);
        process.exit(1);
    } else {
        console.log('Worker fetched ' + stations.length + ' stations. ' + (new Date().toISOString()));
        process.exit();
    }
});
