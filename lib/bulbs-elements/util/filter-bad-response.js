import es6Promise from 'es6-promise';
es6Promise.polyfill();

export default function filterBadResponse (response) {
  debugger
  if (!response.ok) {
    throw new Error(`Bad response: ${response.status} - ${response.statusText}`);
  }
}
