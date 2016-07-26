/* eslint-disable no-return-assign */
import React from 'react';

import { shallow } from 'enzyme';

import RailPlayerHeader from './header';

import VideoPlayButton from 'bulbs-elements/components/video-play-button';

describe('<rail-player> <RailPlayerHeader>', () => {
  let subject;

  context('channel from video matches channel prop', () => {
    beforeEach(() => {
      let props = {
        channel: 'channel',
        video: {
          channel_slug: 'channel',
          channel_name: 'Channel',
          channel_logo_url: 'http://example.org/logo-url',
        },
      };

      subject = shallow(<RailPlayerHeader {...props}/>);
    });

    it('renders an image', () => {
      expect(subject).to.have.descendants('img.rail-player-logo');
    });

    it('sets the image src to video.channel_logo_url', () => {
      expect(subject.find('img')).to.have.attr('src', 'http://example.org/logo-url');
    });

    it('sets the image alt to video.channel_name', () => {
      expect(subject.find('img')).to.have.attr('alt', 'Channel');
    });
  });

  context('channel from video does not match channel prop', () => {
    beforeEach(() => {
      let props = {
        channel: 'no-match',
        video: {
          channel_slug: 'nope-not-a-match',
        },
      };

      subject = shallow(<RailPlayerHeader {...props}/>);
    });

    it('returns a <VideoPlayButton>', () => {
      expect(subject).to.contain(<VideoPlayButton/>);
    });
  });
});
