'use strict';

var app = angular.module('velo-app', ['ngRoute']);

app.config(function ($routeProvider) {
    L.mapbox.accessToken = 'pk.eyJ1Ijoiam9yZGFuYWJkZXJyYWNoaWQiLCJhIjoiY2loZG56MDlqMDAzOXY0a3FxYW55OXplZSJ9.lEgruWmyCm-E-300PG7XuA';

    $routeProvider.when('/', {
        controller: 'MainCtrl',
        templateUrl: '/views/main.html'
    });
});
