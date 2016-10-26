export default function prepGaEventTracker (gaPrefix, gaId, dimensions = {}) {
  gaPrefix += Math.floor(Math.random() * 500);

  ga('create', gaId, 'auto', { name: gaPrefix });

  for (let key in dimensions) {
    ga(`${gaPrefix}.set`, key, dimensions[key]);
  }

  // return function that calls google analytics event
  return (method, ...args) => {
    global.ga(`${gaPrefix}.${method}`, ...args);
  };
}
