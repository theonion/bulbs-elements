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
/* global starwipe */

export default function () {
  if (window.starwipe) {
    return starwipe.analyticsManager;
  }
  else {
    return analyticsManager;
  }
}

