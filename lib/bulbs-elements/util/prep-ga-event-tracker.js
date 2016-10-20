export default function prepGaEventTracker (gaPrefix, gaId, dimensions = {}) {
  ga('create', gaId, 'auto', { name: gaPrefix });

  for (let key in dimensions) {
    ga(`${gaPrefix}.set`, key, dimensions[key]);
  }

  // return function that sends google analytics event
  return (eventCategory, eventAction, eventLabel, eventValue) => {
    global.ga(
      `${gaPrefix}.send`,
      'event',
      eventCategory,
      eventAction,
      eventValue
    );
  };
}
