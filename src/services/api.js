'use strict'

var request = require('request');

var apiConfig = require('../../config/api');

var _buildURL = function (city, stationId) {
    return apiConfig.stationEndpoint + (stationId ? stationId + '/' : '') +'?apiKey=' + process.env['BIKE_API_KEY'] + '&contract=' + city;
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
    getStations: function (city, callback) {
        request(_buildURL(city), {timeout: apiConfig.timeout}, function (error, response, body) {
            _handleCallback(error, response, body, callback);
        });
    },

    getStation: function (city, stationId, callback) {
        request(_buildURL(city, stationId), {timeout: apiConfig.timeout}, function (error, response, body) {
            _handleCallback(error, response, body, callback);
        });
    },

    getCities: function (callback) {
        request(apiConfig.cityEndpoint + '?apiKey=' + process.env['BIKE_API_KEY'], {timeout: apiConfig.timeout}, function (error, response, body) {
            _handleCallback(error, response, body, callback);
        });
    }
};
