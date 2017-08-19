'use strict';

// load env vars from .env file
require('dotenv').config();

const moment = require('moment');

const firebase = require('./firebase');
const auth = require('./auth');
const utils = require('./utils');

main();

async function main() {
  while (true) {
    await sendHeartBeat();
    await utils.delayPromise(60000); // 1 minute
  }
}

async function sendHeartBeat() {
  // make sure the user is authenticated
  await auth.ensureAuthenticated();

  // make a nested structure of date/time
  const key = moment().format('YYYY/MM/DD/[time]/HH/mm');

  console.log(`sending to ${key}`);
  await firebase.database().ref(`powerData/${key}`).set(1);
  console.log('sent');
}
