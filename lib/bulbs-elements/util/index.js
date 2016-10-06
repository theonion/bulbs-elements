import copyAttribute from './copy-attribute';
import filterBadResponse from './filter-bad-response';
import getResponseJSON from './get-response-json';
import getResponseText from './get-response-text';
import InViewMonitor from './in-view-monitor';
import iterateObject from './iterate-object';
import loadOnDemand from './load-on-demand';
import makeRequest from './make-request';
import moveChildren from './move-children';
import getAnalyticsManager from './get-analytics-manager';
import supportsCalcInTransform from './supports-calc-in-transform';
import isNumericString from './is-numeric-string';
import { getWindowDimensions, getScrollOffset } from './dimensions';

module.exports = {
  copyAttribute,
  filterBadResponse,
  getAnalyticsManager,
  getResponseJSON,
  getResponseText,
  getScrollOffset,
  getWindowDimensions,
  InViewMonitor,
  isNumericString,
  iterateObject,
  loadOnDemand,
  makeRequest,
  moveChildren,
  supportsCalcInTransform,
};
