import { assert } from 'chai';
import ControllerField from './controller';

describe('<bulbs-video> ControllerField', function () {
  let { actions } = ControllerField;

  it('initialState', function () {
    assert.deepEqual(ControllerField.initialState, {});
  });

  describe('initialAction', function () {
    it('passes state through untouched', function () {
      // write actual tests
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {});
    });
  });
});
