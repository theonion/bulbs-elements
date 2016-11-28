import cloneObject from 'clone';
import invariant from 'invariant';
import cachedFetch from './cached-fetch';

export default function makeRequest (url, options = {}) {
  invariant(options.success, 'makeRequest MUST have a success callback');
  invariant(options.failure, 'makeRequest MUST have a failure callback');
  invariant(options.error, 'makeRequest MUST have an error callback');

  let { success, failure, error } = options;
  let callbacks = { success, failure, error };
  let requestOptions = cloneObject(options);

  // defensively deleting these options
  // so we don't pass them through to fetch
  delete requestOptions.success;
  delete requestOptions.failure;
  delete requestOptions.error;

  if (!options.redirect) {
    requestOptions.redirect = 'follow';
  }

  return cachedFetch(url, requestOptions)
    .then(callbacks.success)
    .catch(callbacks.error)
  ;
}
