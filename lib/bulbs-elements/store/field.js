export default class Field {
  constructor (props) {
    this._props = props;
    this.initialState = this._props.initialState || null;
  }

  set props (props) {
    this._props = props;
    return this._props;
  }

  get props () {
    return this._props;
  }

  get actions () {
    let actions = {};
    Object.keys(this.props).forEach((propKey) => {
      if (propKey !== 'initialState') {
        actions[propKey] = this.props[propKey];
      }
    });
    return actions;
  }
}
