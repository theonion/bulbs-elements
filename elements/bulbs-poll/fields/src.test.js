import { assert } from 'chai';
import SrcField from './src';

describe('<bulbs-poll> SrcField', function () {
  let { actions } = SrcField;

  it('initialState', function () {
    assert.deepEqual(SrcField.initialState, null);
  });

  describe('setSrc', function () {
    it('sets src', function () {
      // write actual tests
      let nextState = actions.setSrc.invoke({}, '/whatever.json');
      assert.deepEqual(nextState, '/whatever.json');
    });
  });
});
