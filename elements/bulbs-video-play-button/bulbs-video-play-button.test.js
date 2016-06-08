import React from 'react';
import { shallow } from 'enzyme';
import BulbsVideoPlayButton from './bulbs-video-play-button';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

describe('<bulbs-video-play-button> <BulbsVideoPlayButton>', function() {
  describe('render', () => {
    it('renders a play button', () => {
      expect(
        shallow(
          <BulbsVideoPlayButton/>
        ).equals(
          <VideoPlayButton/>
        )
      ).to.be.true;
    });
  });
});
