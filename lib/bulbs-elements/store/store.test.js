import Store from './store';

describe('BulbsElements Store', function () {
  let subject;
  let schema = {
    foo: {
      initialState: 10,
      actions: {
        addTen: (state) => {
          return state + 10;
        },
        subtractOne: (state) => {
          return state - 1;
        },
      },
    },
    bar: {
      initialState: {
        baz: 'bat',
        car: { },
      },
      actions: {
        updateBaz: (state, newValue) => {
          state.baz = newValue;
          return state;
        },
      },
    },
  };

  beforeEach(function () {
    subject = new Store({ schema });
  });

  it('collects initial state from all fields', function () {
    assert.deepEqual(subject.state, {
      foo: 10,
      bar: {
        baz: 'bat',
        car: { },
      },
    });
  });

  it('wraps actions from all fields', function () {
    let actionKeys = Object.keys(subject.actions);
    assert.deepEqual(actionKeys, [
      'addTen',
      'subtractOne',
      'updateBaz',
    ]);
  });

  it('manages state changes in wrapped actions', function () {
    subject.actions.addTen();
    assert.equal(subject.state.foo, 20);
  });

  it('sets initial state of subscribed components', function () {
    let component = {
      setState: (state) => {
        component.state = state;
      },
    };

    subject.subscribeComponent(component);
    assert.deepEqual(component.state, {
      foo: 10,
      bar: {
        baz: 'bat',
        car: { },
      },
    });
  });

  it('updates state of subscribed components', function () {
    let component = {
      setState: (state) => {
        component.state = state;
      },
    };

    subject.subscribeComponent(component);
    subject.actions.updateBaz('new baz');
    assert.deepEqual(component.state.bar.baz, 'new baz');
  });

  it('doesn\'t set state of unsubscribed components', function () {
    let component = {
      setState: (state) => {
        component.state = state;
      },
    };

    subject.subscribeComponent(component);
    subject.unsubscribeComponent(component);
    subject.actions.updateBaz('new baz');
    assert.equal(component.state.bar.baz, 'bat');
  });
});
