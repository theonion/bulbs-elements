import cloneObject from 'clone';
import iterateObject from 'bulbs-elements/util/iterate-object';

import Field from './field';

function collectInitialState (schema) {
  let initialState = {};
  iterateObject(schema, (field, key) => {
    initialState[key] = cloneObject(field.initialState);
  });
  return initialState;
}

function flattenActions (schema) {
  let actions = {};
  iterateObject(schema, (field, fieldKey) => {
    iterateObject(field.actions, (action, actionKey) => {
      action.fieldName = fieldKey;
      action.type = actionKey;
      actions[actionKey] = action;
    });
  });

  return actions;
}

function wrapActions (schema, store) {
  let actions = flattenActions(schema);
  let wrappedActions = {};
  iterateObject(actions, (action, actionKey) => {
    wrappedActions[actionKey] = dispatchFunction.bind(null, store, action);
  });
  return wrappedActions;
}

function deliverSubscriptions (store, nextState) {
  store.components.forEach((component) => {
    component.setState(nextState);
  });
}

function dispatchFunction (store, action, payload) {
  if (process.env.NODE_ENV !== 'production') {
    console.time(`dispatch ${action.type}`);
  }

  let nextState = cloneObject(store.state);
  let actionState = nextState[action.fieldName];
  let actionNextState = cloneObject(actionState);
  actionNextState = action(actionNextState, payload, store);
  nextState[action.fieldName] = actionNextState;
  store.state = nextState;
  deliverSubscriptions(store, nextState);

  if (process.env.NODE_ENV !== 'production') {
    console.groupCollapsed(
      `DISPATCH %c${action.type} %c=> %c${action.fieldName}`,
      'color:green',
      'color:auto',
      'color:blue'
    );
    console.timeEnd(`dispatch ${action.type}`);
    console.log('PAYLOAD: ', payload);
    console.log('PREV VALUE: ', actionState);
    console.log('NEXT VALUE: ', actionNextState);
    console.log('PREV STORE: ', store.state);
    console.log('NEXT STORE: ', nextState);
    console.groupEnd();
  }
}

export default class Store {
  constructor (options) {
    this.actions = wrapActions(options.schema, this);
    this.state = collectInitialState(options.schema);
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
}
