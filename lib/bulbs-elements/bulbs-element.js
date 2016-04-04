import React from 'react';
import Store from './store';

export default class BulbsElement extends React.Component {
  constructor (props) {
    super(props);
    if (this.constructor.schema) {
      let schema = this.constructor.schema;
      this.store = new Store({
        schema: this.constructor.schema
      });
      this.store.subscribeComponent(this);
      setImmediate(this.initialDispatch.bind(this));
    }
  }

  initialDispatch () { }
}
