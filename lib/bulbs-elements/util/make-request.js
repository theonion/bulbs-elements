import cloneObject from 'clone';
import invariant from 'invariant';
import cachedFetch from './cached-fetch';

export default function makeRequest (url, options = {}) {
  invariant(options.success, 'makeRequest MUST have a success callback');
  invariant(options.error, 'makeRequest MUST have an error callback');

  let { success, error } = options;
  let callbacks = { success, error };
  let requestOptions = cloneObject(options);

  // defensively deleting these options
  // so we don't pass them through to fetch
  delete requestOptions.success;
  delete requestOptions.error;

  if (!options.redirect) {
    requestOptions.redirect = 'follow';
  }

  let promiseToFetch = cachedFetch(url, requestOptions);
  promiseToFetch.catch(callbacks.error);
  return promiseToFetch.then(callbacks.success);
}
