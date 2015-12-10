'use strict';

angular.module('velo-app').factory('apiService', ['$http', function ($http) {
    return {
        getStations: function () {
            return $http.get('/api/cities/lyon/stations');
        }
    };
}]);
