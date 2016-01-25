import mapObject from 'object-map-to-array';

class DuplicateActionError extends Error {
}

export class Store {
  constructor (component) {
    this.dispatch = this.dispatch.bind(this);
    this.actions = this.collectActions();
    this.state = this.collectInitialState();
    this.component = component;
    this.component.state = this.state;
    console.log('%cCREATED STORE', 'color:green');
  }

  dispatch (action, payload) {
    console.time('dispatch')
    let nextState = this.state ? Object.assign(this.state) : this.state;
    let actionState = this.getStateForAction(action, nextState);

    let actionNextState;
    if (action instanceof Function) {
      actionNextState = action(actionState, payload, this.dispatch);
    }
    else if (action instanceof Action) {
      actionNextState = action.invoke(actionState, payload, this.dispatch);
    }
    this.setStateForAction(action, nextState, actionNextState);
    this.state = nextState;
    this.component.setState(this.state);
    console.groupCollapsed(
      `DISPATCH %c${action.type} %c=> %c${action.fieldKey}`,
      'color:green', 'color:auto','color:blue'
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
    let field = state[action.fieldKey];
    return field ? Object.assign(field) : field;
  }

  setStateForAction (action, state, actionState) {
    state[action.fieldKey] = actionState;
  }

  eachField (callback) {
    mapObject(this.constructor.fields, callback)
  }

  collectActions (fields={}) {
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
    this.eachField((field, key) => initialState[key] = field.initialState)
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
}

export class Field {
  constructor (props) {
    this._props = props;
    this.initialState = this._props.initialState || null;
  }

  set props (props) {
    return this._props = props;
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

export class PromiseField extends Field {
  constructor (callbacks) {
    super({
      initialState: {
        active: false
      }
    });
    this.callbacks = callbacks;
  }

  generateActions () {
    let {
      generate,
      success,
      error,
    } = this.callbacks;

    if (this._actions) {
      return;
    }

    let actions = this._actions = {
      [`${this.key}Request`]: new Action(function (state={}, payload, dispatch) {
        let promise = generate(state, payload)
          .then((response) => dispatch(actions[`${this.fieldKey}Success`], response) )
          .catch((error) => dispatch(actions[`${this.fieldKey}Error`], error) )
        ;
        state.active = true;
        state.promise = promise;
        return state;
      }),
      [`${this.key}Success`]: new Action (function (state, payload) {
        state.active = false;
        return success.invoke(state, payload);
      }),
      [`${this.key}Error`]: new Action (function (state, payload) {
        state.active = false;
        return error.invoke(state, payload);
      }),
      [`${this.key}Reset`]: new Action (function (state, payload) {
        return {
          active: false
        };
      })
    };
  }

  get actions () {
    this.generateActions();
    return this._actions;
  }
}

export class Action {
  constructor (handler) {
    this.invoke = handler;
  }
}
