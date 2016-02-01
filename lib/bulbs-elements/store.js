import mapObject from 'object-map-to-array';

class DuplicateActionError extends Error {}

export class Store {
  constructor () {
    this.dispatch = this.dispatch.bind(this);
    this.actions = this.collectActions();
    this.state = this.collectInitialState();
    this.components = [];
    console.log('%cCREATED STORE', 'color:green');
  }

  subscribeComponent (component) {
    this.components.push(component);
    component.state = this.state;
  }

  deliverSubscriptions () {
    this.components.forEach((component) => {
      component.setState(this.state);
    });
  }

  dispatch (action, payload) {
    console.time('dispatch');
    let nextState = this.state ? Object.assign({}, this.state) : this.state;
    let actionState = this.getStateForAction(action, nextState);
    let actionNextState = Object.assign({}, actionState);
    actionNextState = action.invoke(actionNextState, payload, this);
    this.setStateForAction(action, nextState, actionNextState);
    this.state = nextState;
    this.deliverSubscriptions();
    console.groupCollapsed(
      `DISPATCH %c${action.type} %c=> %c${action.fieldKey}`,
      'color:green',
      'color:auto',
      'color:blue'
    );
    console.timeEnd('dispatch');
    console.log('PAYLOAD: ', payload);
    console.log('PREV VALUE: ', actionState);
    console.log('NEXT VALUE: ', actionNextState);
    console.log('PREV STORE: ', this.state);
    console.log('NEXT STORE: ', nextState);
    console.groupEnd();
  }

  getStateForAction (action, state) {
    return state[action.fieldKey];
  }

  setStateForAction (action, state, actionState) {
    state[action.fieldKey] = actionState;
  }

  eachField (callback) {
    mapObject(this.constructor.fields, callback);
  }

  collectActions () {
    let actions = {};
    this.eachField((field) => {
      mapObject(field.actions, (action, key) => {
        if (actions.hasOwnProperty(key)) {
          throw new DuplicateActionError(this, key);
        }
        actions[key] = (payload) => {
          this.dispatch(action, payload);
        };
      });
    });
    return actions;
  }

  collectInitialState () {
    let initialState = {};
    this.eachField((field, key) => initialState[key] = field.initialState);
    return initialState;
  }
}

Store.defineFields = function (StoreClass, fields) {
  mapObject(fields, (field, fieldKey) => {
    field.key = fieldKey;
    mapObject(field.actions, (action, actionKey) => {
      action.fieldKey = fieldKey;
      action.type = actionKey;
    });
  });
  StoreClass.fields = fields;
};

export class Field {
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
    mapObject(this.props, (prop, key) => {
      if (key !== 'initialState') {
        actions[key] = prop;
      }
    });
    return actions;
  }
}

class ActionRequest {
  constructor (url, options, callbacks) {
    this.callbacks = callbacks;

    this.promise = fetch(url, options)
      .then((response) => {
        if (response.status < 300) {
          return response.json().then(this.successCallback);
        }
        else if (response.status >= 400) {
          return response.json().then(this.failureCallback);
        }
      })
      .catch(this.errorCallback)
    ;
  }

  get successCallback () {
    return this.callbacks.success || function () {};
  }

  get failureCallback () {
    return this.callbacks.failure || function () {};
  }

  get errorCallback () {
    return this.callbacks.error || function () {};
  }
}

export class Action {
  constructor (handler) {
    this.invoke = handler;
  }

  request (url, options = {}) {
    let { success, failure, error } = options;
    let callbacks = { success, failure, error };
    let requestOptions = Object.assign({}, options);

    delete requestOptions.success;
    delete requestOptions.failure;
    delete requestOptions.error;

    return new ActionRequest(url, requestOptions, callbacks);
  }
}
