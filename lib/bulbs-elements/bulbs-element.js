import React from 'react';

export default class BulbsElement extends React.Component {
  constructor (props) {
    super(props);
    let StoreConstructor = this.constructor.store;
    this.store = new StoreConstructor();
    this.store.subscribeComponent(this);
    setImmediate(this.initialDispatch.bind(this));
  }

  initialDispatch () { }
}
