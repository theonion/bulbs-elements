import { assert } from 'chai';
import SampleField from './sample';

describe('<sample-element> SampleField', function () {
  let { actions } = SampleField;

  it('initialState', function () {
    assert.deepEqual(SampleField.initialState, {
      things: [],
    });
  });

  describe('initialAction', function () {
    it('sets some things', function () {
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {
        things: [
          'Thing One',
          'Thing Two',
        ],
      });
    });
  });
});
