import { prepGaEventTracker } from 'bulbs-elements/util';

export default function prepGaWrapper (analyticsDimensions, overrides) {
  let parsedDimensions = JSON.parse(analyticsDimensions);
  let parsedOverrides  = JSON.parse(overrides);

  let targetingParams = {
    'dimension1':  parsedOverrides.dimension1  || parsedDimensions.dimension1  || 'None',
    'dimension2':  parsedOverrides.dimension2  || parsedDimensions.dimension2  || 'None',
    'dimension3':  parsedOverrides.dimension3  || parsedDimensions.dimension3  || 'None',
    'dimension4':  parsedOverrides.dimension4  || parsedDimensions.dimension4  || 'None',
    'dimension5':  parsedOverrides.dimension5  || parsedDimensions.dimension5  || 'None',
    'dimension6':  parsedOverrides.dimension6  || parsedDimensions.dimension6  || 'None',
    'dimension7':  parsedOverrides.dimension7  || parsedDimensions.dimension7  || 'None',
    'dimension8':  parsedOverrides.dimension8  || parsedDimensions.dimension8  || 'None',
    'dimension9':  parsedOverrides.dimension9  || parsedDimensions.dimension9  || 'None',
    'dimension10': parsedOverrides.dimension10 || parsedDimensions.dimension10 || 'None',
    'dimension11': parsedOverrides.dimension11 || parsedDimensions.dimension11 || 'None',
    'dimension12': parsedOverrides.dimension12 || parsedDimensions.dimension12 || 'None',
    'dimension13': parsedOverrides.dimension13 || parsedDimensions.dimension13 || 'None',
  };

  return prepGaEventTracker(
    'pageview',
    window.GOOGLE_ANALYTICS_ID,
    targetingParams,
  );
}
