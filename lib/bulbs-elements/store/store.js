import invariant from 'invariant';
import cloneObject from 'clone';

import Field from './field';

export default class Store {
  constructor () {
    this.dispatch = this.dispatch.bind(this);
    this.actions = this.collectActions();
    this.state = this.collectInitialState();
    this.components = [];
    if (process.env.NODE_ENV !== 'production') {
      console.log('%cCREATED STORE', 'color:green');
    }
  }

  subscribeComponent (component) {
    this.components.push(component);
    component.state = this.state;
  }

  unsubscribeComponent (component) {
    let index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  deliverSubscriptions () {
    this.components.forEach((component) => {
      component.setState(this.state);
    });
  }

  dispatch (action, payload) {
    if (process.env.NODE_ENV !== 'production') {
      console.time(`dispatch ${action.type}`);
    }

    let nextState = this.state ? cloneObject(this.state) : this.state;
    let actionState = this.getStateForAction(action, nextState);
    let actionNextState = cloneObject(actionState);
    actionNextState = action.invoke(actionNextState, payload, this);
    this.setStateForAction(action, nextState, actionNextState);
    this.state = nextState;
    this.deliverSubscriptions();

    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(
        `DISPATCH %c${action.type} %c=> %c${action.fieldKey}`,
        'color:green',
        'color:auto',
        'color:blue'
      );
      console.timeEnd(`dispatch ${action.type}`);
      console.log('PAYLOAD: ', payload);
      console.log('PREV VALUE: ', actionState);
      console.log('NEXT VALUE: ', actionNextState);
      console.log('PREV STORE: ', this.state);
      console.log('NEXT STORE: ', nextState);
      console.groupEnd();
    }
  }

  getStateForAction (action, state) {
    return state[action.fieldKey];
  }

  setStateForAction (action, state, actionState) {
    state[action.fieldKey] = actionState;
  }

  collectActions () {
    let actions = {};
    Object.keys(this.constructor.fields).forEach((fieldKey) => {
      let field = this.constructor.fields[fieldKey];
      Object.keys(field.actions).forEach((actionKey) => {
        let action = field.actions[actionKey];
        invariant(!actions.hasOwnProperty(actionKey),
        `
Two fields of ${this.constructor.name} have defined an action named '${actionKey}'.
Check the definition of '${field.name}'.
        `
        );
        actions[actionKey] = (payload) => {
          this.dispatch(action, payload);
        };
      });
    });
    return actions;
  }

  collectInitialState () {
    let initialState = {};
    Object.keys(this.constructor.fields).forEach((fieldKey) => {
      let field = this.constructor.fields[fieldKey];
      initialState[fieldKey] = cloneObject(field.initialState);
    });
    return initialState;
  }
}

Store.defineFields = function (StoreClass, fields) {
  Object.keys(fields).forEach((fieldKey) => {
    let field = fields[fieldKey];
    field.key = fieldKey;
    invariant(field instanceof Field,
      `
Store.defineField called with an object that is not
an instance of import Field from 'bulbs-elements/store'.
Check the value of the key: '${fieldKey}'.
It was set to:

${field}
      `
    );
    Object.keys(field.actions).forEach((actionKey) => {
      let action = field.actions[actionKey];
      action.fieldKey = fieldKey;
      action.type = actionKey;
    });
  });

  StoreClass.fields = fields;
};
