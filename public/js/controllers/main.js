'use strict';

angular.module('velo-app').controller('MainCtrl', ['$scope', 'apiService', 'mapService', function ($scope, apiService, mapService) {
    $scope.initialize = function () {
        mapService.buildMap().on('load', function () {
            apiService.getStations().then(
                function (response) {
                    mapService.drawStations(response.data);
                },
                function (error) {
                    // TODO handle this error properly.
                    console.error(error);
                }
            );
        });
    };
    
    $scope.initialize();
}]);
