/* eslint-disable no-return-assign */

import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import video from '../fixtures/video.json';

import VideoPlayButton from 'bulbs-elements/components/video-play-button';
import BulbsVideoSummary, { VideoSummaryView } from './summary';
import VideoRequestField from '../fields/video-request';
import VideoField from '../fields/video';

describe('<bulbs-video-summary>', () => {
  let subject;
  let props;

  beforeEach(() => {
    props = { src: '//example.com/video.json' };
    subject = new BulbsVideoSummary(props);
    sinon.stub(subject.store.actions, 'fetchVideo');
  });

  it('has a displayName', () => {
    expect(BulbsVideoSummary.displayName).to.eq('BulbsVideoSummary');
  });

  describe('schema', () => {
    beforeEach(() => subject = BulbsVideoSummary.schema);

    it('has a video field', () => {
      expect(subject.video).to.eq(VideoField);
    });

    it('has a video request field', () => {
      expect(subject.videoRequest).to.eq(VideoRequestField);
    });
  });

  describe('propTypes', () => {
    beforeEach(() => subject = BulbsVideoSummary.propTypes);

    it('accepts nowPlaying bool', () => {
      expect(subject.nowPlaying).to.eq(PropTypes.string);
    });
  });

  describe('initialDispatch', () => {
    it('invokes fetchVideo action', () => {
      subject.initialDispatch();
      expect(subject.store.actions.fetchVideo).to.have.been.called;
    });
  });

  describe('componentDidUpdate', () => {
    context('src does not change', () => {
      it('does not invoke fetchVideo action', () => {
        subject.componentDidUpdate({ src: '//example.com/video.json' });
        expect(subject.store.actions.fetchVideo).not.to.have.been.called;
      });
    });

    context('src changes', () => {
      it('invokes fetchVideo action', () => {
        subject.componentDidUpdate({ src: '//example.com/video-2.json' });
        expect(subject.store.actions.fetchVideo).to.have.been.called;
      });
    });
  });

  describe('render', () => {
    it('renders <VideoSummaryView>', () => {
      subject = shallow(<BulbsVideoSummary nowPlaying=''/>);
      subject.setState({ video });
      expect(subject.equals(
        <VideoSummaryView video={video} nowPlaying={true}/>
      )).to.be.true;
    });
  });

  describe('<VideoSummaryView>', () => {
    context('no video prop', () => {
      beforeEach(() => {
        subject = shallow(<VideoSummaryView/>);
      });
      it('renders blank div', () => {
        expect(subject.equals(<div/>)).to.be.true;
      });
    });

    context('with video prop', () => {
      beforeEach(() => {
        subject = shallow(<VideoSummaryView video={video}/>);
      });

      it('renders a video-summary element', () => {
        expect(subject).to.have.descendants('.bulbs-video-summary');
      });

      it('renders a video-poster element', () => {
        expect(subject).to.have.descendants('.bulbs-video-poster');
      });

      it('renders a poster image', () => {
        expect(subject.find('.bulbs-video-poster')).to.contain(
          <img src={video.poster_url}/>
        );
      });

      it('renders a <VideoPlayButton>', () => {
        expect(subject.find('.bulbs-video-poster')).to.contain(
          <VideoPlayButton/>
        );
      });

      it('does not render a now playing indicator', () => {
        expect(subject).not.to.have.descendants('.bulbs-video-summary-playing');
      });

      it('renders a summary title', () => {
        expect(subject).to.contain(
          <h3 className='bulbs-video-summary-title'>
            {video.title}
          </h3>
        );
      });
    });

    context('with nowPlaying prop', () => {
      beforeEach(() => {
        subject = shallow(<VideoSummaryView video={video} nowPlaying={true}/>);
      });

      it('renders a now playing indicator', () => {
        expect(subject.find('.bulbs-video-poster')).to.contain(
          <div className='bulbs-video-summary-playing'>
            Now Playing
          </div>
        );
      });
    });
  });
});
