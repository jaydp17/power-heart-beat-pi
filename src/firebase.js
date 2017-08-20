'use strict';

const firebase = require('firebase');

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
  console.log('[isConnected]', isConnected);
});

// add a helper method to check if firebase is connected before sending data
firebase.isConnected = () => isConnected;

module.exports = firebase;
