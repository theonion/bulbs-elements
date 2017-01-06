import firebase from 'firebase/app';
import 'firebase/database';

let firebaseApps = {};

export function getFirebaseDB (opts) {
  if (!firebaseApps[opts.appName]) {
    let config = {
      apiKey: opts.apiKey,
      databaseURL: opts.databaseURL,
    };
    firebaseApps[opts.appName] = firebase.initializeApp(config, opts.appName);
  }

  return firebaseApps[opts.appName].database();
}
