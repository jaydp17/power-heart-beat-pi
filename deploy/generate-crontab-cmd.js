'use strict';

/**
 * Generates a command to put in the crontab
 */

const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const indexFilePath = path.resolve(__dirname, '../src/index.js');
const nodePath = execSync('which node').toString().trim();
const cronLogsFolder = path.resolve(os.homedir(), 'cron-logs');
const logFilePath = path.resolve(cronLogsFolder, 'power-heart-beat-pi.log');

execSync(`mkdir -p ${cronLogsFolder}`);

console.log('# paste this in your crontab file');
console.log("# make sure it's not there already");
console.log(`* * * * * NODE_ENV=production ${nodePath} ${indexFilePath} >> ${logFilePath} 2>&1`);
