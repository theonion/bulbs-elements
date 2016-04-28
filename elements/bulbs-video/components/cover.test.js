import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import Cover from './cover';
import CroppedImage from 'bulbs-elements/components/cropped-image';
import video from '../fixtures/video.json';

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

    it('renders a play button', () => {
      expect(subject).to.contain(
        <button onClick={revealPlayer}>
          ▶
        </button>
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
