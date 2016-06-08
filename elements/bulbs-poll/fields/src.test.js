import { assert } from 'chai';
import SrcField from './src';

describe('<bulbs-poll> SrcField', function() {
  let { actions } = SrcField;

  it('initialState', function() {
    assert.deepEqual(SrcField.initialState, '');
  });

  describe('setSrc', function() {
    it('sets src', function() {
      let nextState = actions.setSrc({}, '/whatever.json');
      assert.deepEqual(nextState, '/whatever.json');
    });
  });
});
