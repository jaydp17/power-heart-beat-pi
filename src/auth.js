'use strict';

/**
 * This module takes care of authenticating with firebase
 * so that the Raspberry PI can write data to Firebase Realtime Database
 */

const firebase = require('./firebase');

/**
 * Ensures that a user is logged in
 * After calling this function it's safe to assume that a user is definitely logged in
 */
async function ensureAuthenticated() {
  const email = process.env.FIREBASE_AUTH_EMAIL;
  if (!email) throw new Error('FIREBASE_AUTH_EMAIL not provided in env vars');

  const password = process.env.FIREBASE_AUTH_PASSWORD;
  if (!password) throw new Error('FIREBASE_AUTH_PASSWORD not provided in env vars');

  console.log('user', firebase.auth().currentUser);
  if (firebase.auth().currentUser) {
    return firebase.auth().currentUser;
  }
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

exports.ensureAuthenticated = ensureAuthenticated;
