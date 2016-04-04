import makeRequest from 'bulbs-elements/util/make-request';

export default class Action {
  constructor (handler) {
    this.invoke = handler;
  }

  request (url, options) {
    makeRequest(url, options);
  }
}
