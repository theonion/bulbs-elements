import prepGaWrapper from './prep-ga-wrapper';
import getAnalyticsManager from './get-analytics-manager';
import {
  adBlockerOn,
} from './detect-ad-block';

export default function prepReadingListAnalytics (element, dimensionOverrides) {
  let parent = element.closest('bulbs-reading-list-item')[0];
  let dataset = {};

  if (parent) {
    dataset = parent.dataset;
  }

  dimensionOverrides.dimension108 = adBlockerOn();

  return {
    analyticsManager: getAnalyticsManager(),
    analyticsWrapper: prepGaWrapper(dataset.contentAnalyticsDimensions, dimensionOverrides),
    title: dataset.title,
  };
}
