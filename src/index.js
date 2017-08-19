'use strict';

// load env vars from .env file
require('dotenv').config();

const firebase = require('./firebase');
const auth = require('./auth');

main();

async function main() {
  console.log('hello world');
  await auth.ensureAuthenticated();
  firebase.database().ref('hello').set('world').then(console.log).then(() => 'done!');
}
