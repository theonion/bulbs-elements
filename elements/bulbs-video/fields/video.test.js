import { assert } from 'chai';
import VideoField from './video';

describe('<bulbs-video> VideoField', () => {
  let { actions } = VideoField;

  it('initialState', () => {
    assert.deepEqual(VideoField.initialState, undefined); // eslint-disable-line no-undefined
  });

  describe('setVideoField', () => {
    it('replaces state', () => {
      expect(
        actions.setVideoField({}, {})
      ).to.eql({});
    });
  });
});
