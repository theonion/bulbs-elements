import prepGaWrapper from './prep-ga-wrapper';
import getAnalyticsManager from './get-analytics-manager';

export default function prepReadingListAnalytics (element, dimensionOverrides) {
  let analyticsManager = getAnalyticsManager();
  let parent = element.closest('bulbs-reading-list-item')[0];
  let dataset = {};

  if (parent !== undefined) {
    dataset = parent.dataset;
  }

  let analyticsWrapper = prepGaWrapper(dataset.contentAnalyticsDimensions, dimensionOverrides);

  return {
    analyticsManager: analyticsManager,
    analyticsWrapper: analyticsWrapper,
    href: dataset.href,
    title: dataset.title,
  }
}
