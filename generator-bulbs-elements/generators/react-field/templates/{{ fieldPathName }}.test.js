import { assert } from 'chai';
import <%= fieldClassName %>Field from './<%= fieldPathName %>';

describe('<<%= elementName %>> <%= fieldClassName %>Field', function () {
  let { actions } = <%= fieldClassName %>Field;

  it('initialState', function () {
    assert.deepEqual(<%= fieldClassName %>Field.initialState, {});
  });

  describe('initialAction', function () {
    it('passes state through untouched', function () {
      // write actual tests
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {});
    });
  });
});
