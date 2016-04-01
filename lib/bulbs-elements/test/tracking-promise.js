global.OriginalPromise = global.Promise;
let OriginalPromise = global.OriginalPromise;

let TRACK_PROMISES = true;
export default class TrackingPromise extends OriginalPromise {
  constructor (executor) {
    super(executor);
    if (TRACK_PROMISES) {
      TrackingPromise.trackPromise(this);
    }
  }
}

TrackingPromise.trackPromise = function (promise) {
  TRACK_PROMISES = false;
  let trackedPromise = new Promise((resolve, reject) => {
    promise.then((value) => {
      TrackingPromise.discardPromise(trackedPromise);
      resolve(value);
    });
    promise.catch((error) => {
      TrackingPromise.discardPromise(trackedPromise);
      reject(error);
    });
  });
  TRACK_PROMISES = true;
  TrackingPromise.promises.push(trackedPromise);
};

TrackingPromise.discardPromise = function (promise) {
  let index = TrackingPromise.promises.indexOf(promise);
  if (index > -1) {
    TrackingPromise.promises.splice(index, 1);
  }
};

TrackingPromise.promises = [];

TrackingPromise.awaitAll = function (callback) {
  if (TrackingPromise.promises.length === 0) {
    return callback();
  }
  setImmediate(() => {
    OriginalPromise.all(TrackingPromise.promises)
      .then(() => TrackingPromise.awaitAll(() => callback()))
      .catch(() => TrackingPromise.awaitAll(() => callback()));
  });
};

global.Promise = TrackingPromise;

