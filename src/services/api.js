'use strict'

var util = require('util');
var request = require('request');

var apiConfig = require('../../config/api');

var _buildURL = function () {
    return util.format('%s?apiKey=%s', apiConfig.stationEndpoint, process.env['BIKE_API_KEY']);
};

var _handleCallback = function (callback) {
    return function (error, response, body) {
        if (error) {
            console.error('An error occured while calling external API. [%s]', error.message);
            callback(error);
        } else {
            callback(null, JSON.parse(body));
        }
    }
};

module.exports = {
    getStations: function (callback) {
        request(_buildURL(), {timeout: apiConfig.timeout}, _handleCallback(callback));
    }
};
