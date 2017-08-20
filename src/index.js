'use strict';

// load env vars from .env file
require('dotenv').config();

const moment = require('moment');
const os = require('os');

const firebase = require('./firebase');
const auth = require('./auth');
const utils = require('./utils');
const { INTERNET_CONNECTED, NO_INTERNET } = require('./constants');

const isProd = process.env.NODE_ENV === 'production' || os.hostname() === 'raspberrypi';
const dbPrefix = isProd ? 'powerData' : 'dev-powerData';

main();

async function main() {
  await utils.delayPromise(2000); // wait for firebase to connect
  while (true) {
    await sendHeartBeat();
    await utils.delayPromise(60000); // 1 minute
  }
}

async function sendHeartBeat() {
  // make sure the user is authenticated
  await auth.ensureAuthenticated();

  // make a nested structure of date/time
  const key = moment().format('YYYY/MM/DD/Z/HH/mm');

  const currentState = firebase.isConnected() ? INTERNET_CONNECTED : NO_INTERNET;
  console.log(`sending ${key}: ${currentState}`);
  firebase.database().ref(`${dbPrefix}/${key}`).set(currentState);
}
