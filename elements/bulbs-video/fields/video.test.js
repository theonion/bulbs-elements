import { assert } from 'chai';
import VideoField from './video';

describe('<bulbs-video> VideoField', function () {
  let { actions } = VideoField;

  it('initialState', function () {
    assert.deepEqual(VideoField.initialState, {});
  });

  describe('initialAction', function () {
    it('passes state through untouched', function () {
      // write actual tests
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {});
    });
  });
});
