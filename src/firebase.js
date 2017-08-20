'use strict';

const firebase = require('firebase');
const utils = require('./utils');
const logger = require('./logger');

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'power-heart-beat.firebaseapp.com',
  databaseURL: 'https://power-heart-beat.firebaseio.com',
  projectId: 'power-heart-beat',
  storageBucket: 'power-heart-beat.appspot.com',
};
firebase.initializeApp(config);

// firebase.database.enableLogging(true);

let isConnected = false; // stores the state of internet connectivity
const connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', snap => {
  isConnected = snap.val();
  logger.verbose(`isConnected: ${isConnected}`);
});

// add a helper method to check if firebase is connected before sending data
firebase.isConnected = () => isConnected;

/**
 * Waits till a connection to firebase is established
 * NOTE: it gives up after 10s
 */
firebase.waitForConnection = async () => {
  const waitMs = [100, 200, 500, 1000, 2000, 3000, 4000];
  for (let i = 0; i < waitMs.length; i++) {
    const ms = waitMs[i];
    await utils.delayPromise(ms);
    if (isConnected) {
      logger.debug(`connected in ${ms}ms`);
      return;
    }
  }
};

module.exports = firebase;
