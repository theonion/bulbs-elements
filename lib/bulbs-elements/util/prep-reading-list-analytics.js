import prepGaWrapper from './prep-ga-wrapper';
import getAnalyticsManager from './get-analytics-manager';

export default function prepReadingListAnalytics (element, dimension12) {
  let parent = element.closest('bulbs-reading-list-item')[0];

  if (parent) {
    this.parentAnalyticsDimensions = parent.dataset.contentAnalyticsDimensions;
    this.href = parent.dataset.href;
    this.title = parent.dataset.title;
  }

  let dimensionObject = {
    dimension12: dimension12,
  };

  this.analyticsManager = getAnalyticsManager();
  this.analyticsWrapper = prepGaWrapper(this.parentAnalyticsDimensions, dimensionObject);
}
