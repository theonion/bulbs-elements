export default class Action {
  constructor (handler) {
    this.invoke = handler;
  }
}
