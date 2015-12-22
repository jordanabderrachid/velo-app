'use strict';

var child_process = require('child_process');
var path = require('path');

var databaseConfig = require('../../config/database');
var CronJob = require('cron').CronJob;

var DatabasePopulator = function () {
    this.fetchStationsJob = new CronJob({
        cronTime: databaseConfig.populateCronTime,
        onTick: function () {
            console.log('Now starting a worker to fetch stations. %s', new Date().toISOString());
            child_process.fork(path.join(__dirname, '../workers/database-populator'));   
        }
    });
};

DatabasePopulator.prototype.start = function () {
    console.log('Job set up to fetch stations based on cron time : [%s]', databaseConfig.populateCronTime);
    this.fetchStationsJob.start();
};

module.exports = new DatabasePopulator();
