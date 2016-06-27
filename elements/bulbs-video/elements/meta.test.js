/* eslint-disable no-return-assign */

import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import video from '../fixtures/video.json';

import BulbsVideoMeta, { VideoMetaView } from './meta';
import VideoRequestField from '../fields/video-request';
import VideoField from '../fields/video';

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

  describe('propTypes', () => {
    beforeEach(() => subject = BulbsVideoMeta.propTypes);

    it('requires shareEmailMessage string', () => {
      expect(subject.shareEmailMessage).to.eq(PropTypes.string.isRequired);
    });

    it('requires shareTrackCatagory string', () => {
      expect(subject.shareTrackCatagory).to.eq(PropTypes.string.isRequired);
    });

    it('requires shareTwitterHandle string', () => {
      expect(subject.shareTwitterHandle).to.eq(PropTypes.string.isRequired);
    });

    it('accepts a shareUrl string', () => {
      expect(subject.shareUrl).to.eq(PropTypes.string);
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
    it('renders a <VideoMetaView/>', () => {
      props = {
        shareEmailMessage: 'message',
        shareTrackCatagory: 'category',
        shareTwitterHandle: 'handle',
      };
      let component = shallow(<BulbsVideoMeta {...props}/>);
      component.setState({ video });
      expect(component.equals(
        <VideoMetaView {...props} video={video}/>
      )).to.be.true;
    });
  });

  describe('VideoMetaView', () => {
    beforeEach(() => {
      props = {
        shareEmailMessage: 'message',
        shareTrackCatagory: 'category',
        shareTrackAction: 'action',
        shareTwitterHandle: 'handle',
      };
    });

    context('with no video', () => {
      beforeEach(() => {
        subject = shallow(<VideoMetaView {...props}/>);
      });

      it('renders an empty div', () => {
        expect(subject.equals(<div/>)).to.be.true;
      });
    });

    context('with a video', () => {
      beforeEach(() => {
        subject = shallow(<VideoMetaView {...props} video={video}/>);
      });

      it('renders a meta element', () => {
        expect(subject).to.have.descendants('.bulbs-video-meta');
      });

      it('renders a title', () => {
        expect(subject).to.contain(
          <h1 className='bulbs-video-meta-title'>
            {video.title}
          </h1>
        );
      });

      context('without shareUrl property', () => {
        beforeEach(() => {
          props.shareUrl = null;
          subject = shallow(<VideoMetaView {...props} video={video}/>);
        });

        it('renders share-tools for current page url', () => {
          let shareTools = subject.find('share-tools');
          expect(shareTools).to.have.attr('share-title', video.title);
          expect(shareTools).to.have.attr('share-url', window.location.toString());
          expect(shareTools).to.have.attr('data-track-action', 'action');
        });
      });

      context('with shareUrl Property', () => {
        beforeEach(() => {
          props.shareUrl = '//example.org/share-me';
          subject = shallow(<VideoMetaView {...props} video={video}/>);
        });

        it('renders share-tools for given url', () => {
          let shareTools = subject.find('share-tools');
          expect(shareTools).to.have.attr('share-url', '//example.org/share-me');
        });
      });

      it('renders facebook share-tools', () => {
        expect(subject.find('share-tools')).to.contain(
          <share-via-facebook label icon/>
        );
      });

      it('renders twitter share-tools', () => {
        expect(subject.find('share-tools')).to.contain(
          <share-via-twitter label icon twitter-handle='handle'/>
        );
      });

      it('renders email share-tools', () => {
        expect(subject.find('share-tools')).to.contain(
          <share-via-email label icon message='message'/>
        );
      });
    });
  });
});
