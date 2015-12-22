'use strict';

var influx = require('influx');
var debug = require('debug')('database');

var databaseConfig = require('../../config/database');

var DatabaseService = function () {
    debug('Connecting to database [%s] on %s:%d', databaseConfig.databaseName, databaseConfig.host, databaseConfig.port);

    this._client = influx({
        host: databaseConfig.host,
        port: databaseConfig.port,
        database: databaseConfig.databaseName
    });
};

DatabaseService.prototype.persistStations = function (stations, callback) {
    debug('Starting to persist %d stations.', stations.length);
    this._client.writePoints(databaseConfig.serieName, stations, callback);
};

module.exports = new DatabaseService();
