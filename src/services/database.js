'use strict';

var util = require('util');

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

var _handleCallback = function (callback) {
    return function (error, results) {
        if (error) {
            console.error('An error occured while fetching database. %s', error.message);
            callback(error);
        } else {
            callback(null, results);
        }
    };
};

DatabaseService.prototype.persistStations = function (stations, callback) {
    debug('Starting to persist %d stations.', stations.length);
    this._client.writePoints(databaseConfig.serieName, stations, callback);
};

DatabaseService.prototype.getLatestStations = function (city, callback) {
    city = city.toLowerCase();

    if (!this.isCityLabel(city)) {
        debug('Incorrect parameters city: [%s]', city);
        callback();
        return;
    }

    var QUERY_TEMPLATE = 'SELECT * FROM %s WHERE city=\'%s\' AND time > now() - 1m;';
    var query = util.format(QUERY_TEMPLATE, databaseConfig.serieName, city);

    debug('QUERY: [%s]', query);
    this._client.query(query, _handleCallback(callback));
};

DatabaseService.prototype.getLatestStation = function (city, number, callback) {
    city = city.toLowerCase();

    if (!this.isCityLabel(city) || !this.isNumberLabel(number)) {
        debug('Incorrect parameters city: [%s] number: [%s]', city, number);
        callback();
        return;
    }

    var QUERY_TEMPLATE = 'SELECT * FROM %s WHERE city=\'%s\' AND number=\'%s\' AND time > now() - 1m;';
    var query = util.format(QUERY_TEMPLATE, databaseConfig.serieName, city, number);

    debug('QUERY: [%s]', query);
    this._client.query(query, _handleCallback(callback));
};

DatabaseService.prototype.getCities = function (callback) {
    var QUERY_TEMPLATE = 'SHOW TAG VALUES FROM %s WITH KEY = %s;';
    var query = util.format(QUERY_TEMPLATE, databaseConfig.serieName, 'city');

    debug('QUERY: [%s]', query);
    this._client.query(query, _handleCallback(callback));
};

DatabaseService.prototype.getGraph = function (city, number, callback) {
    city = city.toLowerCase();

    if (!this.isCityLabel(city) || !this.isNumberLabel(number)) {
        debug('Incorrect parameters city: [%s] number: [%s]', city, number);
        callback();
        return;
    }

    var QUERY_TEMPLATE = 'SELECT available_bikes, available_bike_stands FROM %s WHERE city=\'%s\' AND number=\'%s\' AND time > now() - 24h;';
    var query = util.format(QUERY_TEMPLATE, databaseConfig.serieName, city, number);

    debug('QUERY: [%s]', query);
    this._client.query(query, _handleCallback(callback));
};

DatabaseService.prototype.isCityLabel = function (city) {
    return (new RegExp('^[a-z][a-z-]+[a-z]$', 'g')).test(city);
};

DatabaseService.prototype.isNumberLabel = function (number) {
    return (new RegExp('^[0-9]+$', 'g')).test(number);
};

module.exports = new DatabaseService();
