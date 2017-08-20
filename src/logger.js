'use strict';

const winston = require('winston');
const moment = require('moment');

const logger = new winston.Logger({
  level: 'debug', // the minimum level that will be printed
  transports: [
    new winston.transports.Console({
      timestamp: () => moment().format(),
      colorize: 'all',
    }),
  ],
});

module.exports = logger;
