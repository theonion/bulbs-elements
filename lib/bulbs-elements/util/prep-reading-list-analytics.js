import prepGaWrapper from './prep-ga-wrapper';
import getAnalyticsManager from './get-analytics-manager';

export default function prepReadingListAnalytics (element, dimensionOverrides) {
  let parent = element.closest('bulbs-reading-list-item')[0];
  let dataset = {};

  if (parent) {
    dataset = parent.dataset;
  }

  return {
    analyticsManager: getAnalyticsManager(),
    analyticsWrapper: prepGaWrapper(dataset.contentAnalyticsDimensions, dimensionOverrides),
    title: dataset.title,
  };
}
