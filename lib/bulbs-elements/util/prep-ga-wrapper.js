import prepGaEventTracker from './prep-ga-event-tracker';

export default function prepGaWrapper (analyticsDimensions = '{}', overrides = {}) {
  let parsedDimensions = JSON.parse(analyticsDimensions);

  let targetingParams = {
    'dimension1': overrides.dimension1 || parsedDimensions.dimension1 || 'None',
    'dimension2': overrides.dimension2 || parsedDimensions.dimension2 || 'None',
    'dimension3': overrides.dimension3 || parsedDimensions.dimension3 || 'None',
    'dimension4': overrides.dimension4 || parsedDimensions.dimension4 || 'None',
    'dimension5': overrides.dimension5 || parsedDimensions.dimension5 || 'None',
    'dimension6': overrides.dimension6 || parsedDimensions.dimension6 || 'None',
    'dimension7': overrides.dimension7 || parsedDimensions.dimension7 || 'None',
    'dimension8': overrides.dimension8 || parsedDimensions.dimension8 || 'None',
    'dimension9': overrides.dimension9 || parsedDimensions.dimension9 || 'None',
    'dimension10': overrides.dimension10 || parsedDimensions.dimension10 || 'None',
    'dimension11': overrides.dimension11 || parsedDimensions.dimension11 || 'None',
    'dimension12': overrides.dimension12 || parsedDimensions.dimension12 || 'None',
    'dimension13': overrides.dimension13 || parsedDimensions.dimension13 || 'None',
    'dimension108': overrides.dimension108 || parsedDimensions.dimension108 || 'None',
  };

  return prepGaEventTracker(
    'pageview',
    window.GOOGLE_ANALYTICS_ID,
    targetingParams,
  );
}
