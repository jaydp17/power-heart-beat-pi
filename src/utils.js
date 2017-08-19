'use strict';

exports.delayPromise = delayInMs => {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, delayInMs);
  });
};
