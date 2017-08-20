'use strict';

const path = require('path');
const os = require('os');
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const firebase = require('./firebase');
const auth = require('./auth');
const utils = require('./utils');
const { INTERNET_CONNECTED, NO_INTERNET } = require('./constants');

const isProd = process.env.NODE_ENV === 'production' || os.hostname() === 'raspberrypi';
const dbPrefix = isProd ? 'powerData' : 'dev-powerData';

setTimeout(() => {
  console.log('Exiting after 50s of execution');
  process.exit(1);
}, 50000); // 50s

main();

async function main() {
  await firebase.waitForConnection();
  await sendHeartBeat();
  console.log('shutting down');
  process.exit(0);
}

async function sendHeartBeat() {
  // make sure the user is authenticated
  await auth.ensureAuthenticated();

  // make a nested structure of date/time
  const key = moment().format('YYYY/MM/DD/Z/HH/mm');

  const currentState = firebase.isConnected() ? INTERNET_CONNECTED : NO_INTERNET;
  console.log(`sending ${key}: ${currentState}`);
  await firebase.database().ref(`${dbPrefix}/${key}`).set(currentState);
}
