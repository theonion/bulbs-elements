import getResponseJSON from './get-response-json';
import filterBadResponse from './filter-bad-response';

let promiseCache = {};

export default function cachedJSONFetch (url, requestOptions) {
  if (!promiseCache[url]) {
    console.log(`cachedFetch MISS: ${url}`);
    promiseCache[url] = fetch(url, requestOptions)
      .then(filterBadResponse)
      .then(getResponseJSON)
    ;
  }
  else {
    console.log(`cachedFetch HIT: ${url}`);
  }
  return promiseCache[url];
}
