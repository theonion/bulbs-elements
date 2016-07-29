import copyAttribute from './copy-attribute';
import filterBadResponse from './filter-bad-response';
import getResponseJSON from './get-response-json';
import iterateObject from './iterate-object';
import makeRequest from './make-request';
import moveChildren from './move-children';
import supportsCalcInTransform from './supports-calc-in-transform';
import { requestAnimFrame, requestInterval, clearRequestInterval } from './request-animation-frame-polyfill';

module.exports = {
  clearRequestInterval,
  copyAttribute,
  filterBadResponse,
  getResponseJSON,
  iterateObject,
  makeRequest,
  moveChildren,
  requestAnimFrame,
  requestInterval,
  supportsCalcInTransform,
};
