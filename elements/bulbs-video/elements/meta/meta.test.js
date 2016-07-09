/* eslint-disable no-return-assign */

import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import video from '../../fixtures/video.json';

import BulbsVideoMeta from './meta';
import VideoMetaRoot from './components/root';

import VideoRequestField from '../../fields/video-request';
import VideoField from '../../fields/video';

describe('<bulbs-video-meta>', () => {
  let subject;
  let props;

  it('has a displayName', () => {
    expect(BulbsVideoMeta.displayName).to.eq('BulbsVideoMeta');
  });

  describe('schema', () => {
    beforeEach(() => subject = BulbsVideoMeta.schema);

    it('has a video field', () => {
      expect(subject.video).to.eq(VideoField);
    });

    it('has a video request field', () => {
      expect(subject.videoRequest).to.eq(VideoRequestField);
    });
  });

  beforeEach(() => {
    props = { src: '//example.com/video.json' };
    subject = new BulbsVideoMeta(props);
    sinon.stub(subject.store.actions, 'fetchVideo');
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
    it('renders a <VideoMetaRoot/>', () => {
      props = {
        shareEmailMessage: 'message',
        shareTrackCatagory: 'category',
        shareTwitterHandle: 'handle',
      };
      let component = shallow(<BulbsVideoMeta {...props}/>);
      component.setState({ video });
      expect(component.equals(
        <VideoMetaRoot {...props} video={video}/>
      )).to.be.true;
    });
  });

});
