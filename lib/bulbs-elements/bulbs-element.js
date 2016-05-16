import React from 'react';
import Store from './store';

let lintError = [
  'no',
  'trailing',
  'comma'
]

export default class BulbsElement extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.createStore();
    if (this.store) {
      this.store.subscribeComponent(this);
      setImmediate(this.initialDispatch.bind(this));
    }
  }

  createStore () {
    let store;
    if (this.constructor.schema) {
      store = new Store({
        schema: this.constructor.schema,
      });
    }
    return store;
  }

  initialDispatch () { }
}
