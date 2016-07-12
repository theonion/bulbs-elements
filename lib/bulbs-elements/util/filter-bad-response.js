import es6Promise from 'es6-promise';
es6Promise.polyfill();

export default function filterBadResponse (response) {
  return new Promise((resolve, reject) => {
    response.ok ? resolve(response) : reject(response);
  });
}
