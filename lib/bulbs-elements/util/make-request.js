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

  fetch(url, options)
    .then((response) => {
      if (response.status < 300) {
        return response.json().then(callbacks.success);
      }
      else if (response.status >= 400) {
        return response.json().then(callback.failure);
      }
    })
    .catch(callbacks.error)
  ;
}

