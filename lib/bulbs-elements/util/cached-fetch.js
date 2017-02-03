import getResponseJSON from './get-response-json';
import filterBadResponse from './filter-bad-response';

class CachedFetch {
  constructor (url, requestOptions) {
    this.queue = [];
    let promiseToFetch = fetch(url, requestOptions);
    promiseToFetch
      .catch((error) => {
        this.triggered = true;
        this.error = error;
        this.drain(this.queue);
      })
    ;
    promiseToFetch
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then((result) => {
        this.triggered = true;
        this.result = result;
        this.drain(this.queue);
      })
    ;
  }

  drain (triggers) {
    triggers.forEach(({ resolve, reject }) => {
      if (this.result) {
        resolve(this.result);
      }
      if (this.error) {
        reject(this.error);
      }
    });
  }

  enqueue (trigger) {
    if (this.triggered) {
      this.drain([trigger]);
    }
    else {
      this.queue.push(trigger);
    }
  }
}

let promiseCache = {};

export default function cachedJSONFetch (url, requestOptions) {
  return new Promise((resolve, reject) => {
    let cached = promiseCache[url];
    if (!cached) {
      cached = promiseCache[url] = new CachedFetch(url, requestOptions);
    }
    cached.enqueue({ resolve, reject });
  });
}

export function resetCache () {
  promiseCache = {};
}
