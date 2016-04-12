import cloneObject from 'clone';
import iterateObject from 'bulbs-elements/util/iterate-object';
import invariant from 'invariant';
import { reduce } from 'lodash';

export default class Store {
  constructor (options) {
    this.actions = wrapActions(options.schema, this);
    this.state = collectInitialState(options.schema);
    this.components = [];
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
  return reduce(Object.keys(schema), (mem, field) => {
    mem[field] = cloneObject(schema[field].initialState);
    return mem;
  }, {});
}

function flattenActions (schema) {
  let actions = {};
  iterateObject(schema, (field, fieldKey) => {
    iterateObject(field.actions, (action, actionKey) => {
      if (actions[actionKey]) {
        invariant(actions[actionKey] === action, `Store: duplicate action named "${actionKey}"`);
      }
      action.fieldName = fieldKey;
      action.type = actionKey;
      actions[actionKey] = action;
    });
  });

  return actions;
}

function wrapActions (schema, store) {
  let actions = flattenActions(schema);
  return reduce(actions, (mem, action, key) => {
    mem[key] = dispatchFunction.bind(null, store, action);
    return mem;
  }, {});
}

function deliverSubscriptions (store) {
  store.components.forEach((component) => {
    component.setState(store.state);
  });
}

function dispatchFunction (store, action, payload) {
  let priorState = store.state;
  let nextState = Object.assign({}, priorState);
  let priorFieldValue = priorState[action.fieldName];
  let nextFieldValue = cloneObject(priorFieldValue);

  nextState[action.fieldName] = action(nextFieldValue, payload, store);

  // HACK : workaround for broken state modification
  if (typeof nextState[action.fieldName] !== 'undefined') {
    store.state = nextState;
  }

  deliverSubscriptions(store);
}
