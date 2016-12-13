import getResponseJSON from './get-response-json';
import filterBadResponse from './filter-bad-response';

let promiseCache = {};

export default function cachedJSONFetch (url, requestOptions) {
  if (!promiseCache[url]) {
    promiseCache[url] = fetch(url, requestOptions)
      .then(filterBadResponse)
      .then(getResponseJSON)
    ;
  }
  return promiseCache[url];
}
