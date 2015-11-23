'use strict'

var request = require('request');

var apiConfig = require('../../config/api');

var _buildURL = function (stationId) {
    return apiConfig.endpoint + (stationId ? stationId + '/' : '') +'?apiKey=' + process.env['BIKE_API_KEY'] + '&contract=' + apiConfig.contractName;
};

var _handleCallback = function (error, response, body, callback) {
    if (error) {
        console.error(error);
        callback(error);
    } else {
        callback(null, JSON.parse(body));
    }
};

module.exports = {
    getStations: function (callback) {
        request(_buildURL(), {timeout: apiConfig.timeout}, function (error, response, body) {
            _handleCallback(error, response, body, callback);
        });
    },

    getStation: function (stationId, callback) {
        request(_buildURL(stationId), {timeout: apiConfig.timeout}, function (error, response, body) {
            _handleCallback(error, response, body, callback);
        });
    }
};
