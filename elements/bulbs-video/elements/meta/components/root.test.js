import React from 'react';
import { shallow } from 'enzyme';

import video from '../../../fixtures/video.json';

import VideoMetaRoot from './root';
import VideoMetaCampaign from './campaign';

describe('<bulbs-video-meta> <VideoMetaRoot>', () => {
  let subject;
  let props;

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
      subject = shallow(<VideoMetaRoot {...props}/>);
    });

    it('renders an empty div', () => {
      expect(subject.equals(<div/>)).to.be.true;
    });
  });

  context('with a video', () => {
    beforeEach(() => {
      subject = shallow(<VideoMetaRoot {...props} video={video}/>);
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
        subject = shallow(<VideoMetaRoot {...props} video={video}/>);
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
        subject = shallow(<VideoMetaRoot {...props} video={video}/>);
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

    context('with a campaignUrl property', () => {
      let campaign;

      beforeEach(() => {
        props.campaignUrl = '//example.org/campaign';
        subject = shallow(<VideoMetaRoot {...props} video={video}/>);
        campaign = subject.find(VideoMetaCampaign);
      });

      it('renders a <VideoMetaCampaign> element', () => {
        expect(campaign).to.have.length(1);
      });

      it('passes all prps through', () => {
        Object.keys(props).forEach((key) => {
          expect(campaign).to.have.prop(key, props[key]);
        });
      });
    });
  });
});
