import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import Cover from './cover';
import CroppedImage from 'bulbs-elements/components/cropped-image';
import video from '../fixtures/video.json';
import VideoPlayButton from 'bulbs-elements/components/video-play-button'


describe('<bulbs-video> <Cover>', function () {
  describe('propTypes', () => {
    let subject = Cover.propTypes;

    it('requires actions', () => {
      expect(subject.actions).to.eql(PropTypes.object.isRequired);
    });

    it('requires video', () => {
      expect(subject.video).to.eql(PropTypes.object.isRequired);
    });
  });

  describe('render', () => {
    let props;
    let subject;
    let revealPlayer = chai.spy();
    let imageId = 394839;
    let posterUrl = `/video-poster-url/${imageId}/whatever.png`;

    beforeEach(() => {
      props = {
        video: Object.assign({}, video, {
          poster_url: posterUrl,
        }),
        actions: {
          revealPlayer,
        },
      };

      subject = shallow(<Cover {...props}/>);
    });

    it('renders a video cover', () => {
      expect(subject.find('.bulbs-video-cover')).to.have.length(1);
    });

    it('has a click handler', () => {
      expect(subject).to.have.prop('onClick', Cover.prototype.revealPlayer);
    });

    it('renders a play button', () => {
      expect(subject).to.contain(
        <VideoPlayButton/>
      );
    });

    it('renders a CroppedImage', () => {
      expect(subject).to.contain(
        <CroppedImage
          className='bulbs-video-poster'
          imageId={imageId}
          src={posterUrl}
        />
      );
    });
  });
});
