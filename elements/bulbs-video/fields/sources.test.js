import { assert } from 'chai';
import SourceField from './sources';

describe('<bulbs-video> SourceField', function () {
  let { actions } = SourceField;

  it('initialState', function () {
    assert.deepEqual(SourceField.initialState, {});
  });

  describe('initialAction', function () {
    it('passes state through untouched', function () {
      // write actual tests
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {});
    });
  });
});
