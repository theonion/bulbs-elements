/*
FIXME: videohub-player depends on there being an instance of our analytics manager
        at window.AnalyticsManager.
        Some possible solutions:
        1. Have bulbs-video and/or videohub-player initialize their own
           analytics manager
        2. Have bulbs-video and/or videohub-player use a confuration
           such as BULBS_ELEMENTS_ANALYTICS_MANAGER.
        3. Have all sites follow a convention for where AnalyticsManager
           lives.
*/
/* global avclubAnalytics, onionan, clickholean, starwipe */

export default function () {
  let analyticsManager;
  if (window.avclubAnalytics) {
    analyticsManager = avclubAnalytics;
  }
  else if (window.onionan) {
    analyticsManager = onionan;
  }
  else if (window.clickholean) {
    analyticsManager = clickholean;
  }
  else if (window.starwipe) {
    analyticsManager = starwipe.analyticsManager;
  }
  return analyticsManager;
}
