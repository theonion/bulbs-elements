import cloneObject from 'clone';
import iterateObject from 'bulbs-elements/util/iterate-object';

export default class Store {
  constructor (options) {
    this.actions = wrapActions(options.schema, this);
    this.state = collectInitialState(options.schema);
    this.components = [];
    if (false) {
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

function deliverSubscriptions (store) {
  store.components.forEach((component) => {
    component.setState(store.state);
  });
}

function dispatchFunction (store, action, payload) {
  if (false) {
    console.time(`dispatch ${action.type}`);
  }

  let priorState = store.state;
  let nextState = Object.assign({}, priorState);
  let priorFieldValue = priorState[action.fieldName];
  let nextFieldValue = cloneObject(priorFieldValue);

  nextState[action.fieldName] = action(nextFieldValue, payload, store);

  store.state = nextState;
  deliverSubscriptions(store);

  if (false) {
    console.groupCollapsed(
      `DISPATCH %c${action.type} %c=> %c${action.fieldName}`,
      'color:green',
      'color:auto',
      'color:blue'
    );
    console.timeEnd(`dispatch ${action.type}`);
    console.log('PAYLOAD: ', payload);
    console.log('PREV VALUE: ', priorFieldValue);
    console.log('NEXT VALUE: ', nextFieldValue);
    console.log('PREV STORE: ', priorState);
    console.log('NEXT STORE: ', nextState);
    console.groupEnd();
  }
}
