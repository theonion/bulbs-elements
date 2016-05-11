import React from 'react';
import Store from './store';

export default class BulbsElement extends React.Component {
  constructor (props) {
    super(props);
    this.connectToStore();
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

  connectToStore () {
    if (this.store) {
      this.disconnectFromStore();
    }
    this.store = this.createStore();
    if (this.store) {
      this.store.subscribeComponent(this);
      setImmediate(this.initialDispatch.bind(this));
    }
  }

  disconnectFromStore () {
    this.store.unsubscribeComponent(this);
  }

  initialDispatch () { }
}
