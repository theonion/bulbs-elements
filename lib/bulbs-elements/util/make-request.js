import cloneObject from 'clone';
import invariant from 'invariant';

export default function makeRequest (url, options = {}) {
  invariant(options.success, 'makeRequest MUST have an success callback');
  invariant(options.failure, 'makeRequest MUST have an failure callback');
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

  fetch(url, requestOptions)
    .then((response) => {
      let promise;
      if (response.status < 300) {
        promise = response.json().then(callbacks.success);
      }
      else if (response.status >= 400) {
        promise = response.json().then(callbacks.failure);
      }
      return promise;
    })
    .catch(callbacks.error)
  ;
}

