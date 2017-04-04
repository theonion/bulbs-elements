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

  context('with relativeSeriesLinkPrefix', () => {
    let _video;
    beforeEach(() => {
      props.relativeSeriesLinkPrefix = '/prefix';
    });

    context('video has series slug', () => {
      beforeEach(() => {
        _video = Object.assign({}, video);
        _video.series_slug = 'cool-series';
        subject = shallow(<VideoMetaRoot {...props} video={_video}/>);
      });

      it('constructs prefixed url', () => {
        expect(subject.find('a').first()).to.have.attr(
          'href', '/prefix/cool-series'
        );
      });
    });

    context('video has no series slug', () => {
      beforeEach(() => {
        _video = Object.assign({}, video);
        _video.series_slug = null;
        _video.series_url = '//example.org/video.json';
        subject = shallow(<VideoMetaRoot {...props} video={_video}/>);
      });

      it('does not construct prefixed url', () => {
        expect(subject.find('a').first()).to.have.attr(
          'href', '//example.org/video.json'
        );
      });
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
        <bulbs-ellipsize class='bulbs-video-meta-title' line-count='3'>
          {video.title}
        </bulbs-ellipsize>
      );
    });

    context('with a sponsored video', () => {
      let campaign;

      beforeEach(() => {
        video.tunic_campaign_url = '//example.org/campaign';
        props.campaignPlacement = 'foobar';
        props.campaignPreamble = 'foobar';
        props.campaignTrackAction = 'foobar';
        subject = shallow(<VideoMetaRoot {...props} video={video}/>);
        campaign = subject.find(VideoMetaCampaign);
      });

      it('renders a <VideoMetaCampaign> element', () => {
        const campaignProps = campaign.props();

        expect(campaign).to.have.length(1);
        expect(campaignProps.campaignPlacement).to.equal(props.campaignPlacement);
        expect(campaignProps.campaignPreamble).to.equal(props.campaignPreamble);
        expect(campaignProps.campaignTrackAction).to.equal(props.campaignTrackAction);
        expect(campaignProps.campaignUrl).to.equal(video.tunic_campaign_url);
      });
    });
  });
});
