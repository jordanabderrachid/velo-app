'use strict';

var router = require('express').Router();

var databaseService = require('../services/database');

router.get('/graph/:city_name/:station_id', function (req, res) {
    databaseService.getGraph(req.params.city_name, req.params.station_id, function (error, results) {
        if (error) {
            res.status(500).end();
            return;
        }

        if (!results || results.length === 0 || results[0].length === 0) {
            res.status(204).end();
            return;
        }

        res.json(results[0]);
    });
});

module.exports = router;
