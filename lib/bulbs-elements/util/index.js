import Human from './human';
import InViewMonitor from './in-view-monitor';
import LockScroll from './lock-scroll';
import copyAttribute from './copy-attribute';
import debouncePerFrame from './debounce-per-frame';
import {
  detectAdBlock,
  adBlockerOn,
} from './detect-ad-block';
import filterBadResponse from './filter-bad-response';
import getAnalyticsManager from './get-analytics-manager';
import getResponseJSON from './get-response-json';
import getResponseText from './get-response-text';
import inIframe from './in-iframe';
import iterateObject from './iterate-object';
import loadOnDemand from './load-on-demand';
import makeRequest from './make-request';
import moveChildren from './move-children';
import onReadyOrNow from './on-ready-or-now';
import prepGaEventTracker from './prep-ga-event-tracker';
import prepGaWrapper from './prep-ga-wrapper';
import prepReadingListAnalytics from './prep-reading-list-analytics';
import resizeParentFrame from './resize-parent-frame';
import scrollingElement from './scrolling-element';
import supportsCalcInTransform from './supports-calc-in-transform';
import isNumericString from './is-numeric-string';
import {
  getRoundedBoundingClientRect,
  getScrollOffset,
  getWindowDimensions,
} from './dimensions';

module.exports = {
  Human,
  InViewMonitor,
  LockScroll,
  copyAttribute,
  debouncePerFrame,
  detectAdBlock,
  adBlockerOn,
  filterBadResponse,
  getAnalyticsManager,
  getRoundedBoundingClientRect,
  getResponseJSON,
  getResponseText,
  getScrollOffset,
  getWindowDimensions,
  inIframe,
  isNumericString,
  iterateObject,
  loadOnDemand,
  makeRequest,
  moveChildren,
  onReadyOrNow,
  prepGaEventTracker,
  prepGaWrapper,
  prepReadingListAnalytics,
  resizeParentFrame,
  scrollingElement,
  supportsCalcInTransform,
};
