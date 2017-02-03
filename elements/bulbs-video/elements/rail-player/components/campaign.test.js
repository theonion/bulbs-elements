import React from 'react';
import { shallow } from 'enzyme';

import RailPlayerCampaign from './campaign';

xdescribe('<rail-player> <RailPlayerCampaign>', () => {
  let subject;
  let campaignDisplay;

  context('without video.tunic_campaign_url', () => {
    beforeEach(() => {
      let video = {};
      subject = shallow(<RailPlayerCampaign video={video}/>);
    });

    it('renders nothing', () => {
      expect(subject.equals(null)).to.be.true;
    });
  });

  context('with video.tunic_campaign_url', () => {
    beforeEach(() => {
      let props = {
        video: {
          tunic_campaign_url: 'http://example.org/tunic-url',
        },
      };

      subject = shallow(<RailPlayerCampaign {...props}/>);
      campaignDisplay = subject.find('campaign-display');
    });

    it('renders a content sponsorship notice', () => {
      expect(subject).to.have.descendants('campaign-display');
    });

    it('sets the correct class', () => {
      expect(campaignDisplay).to.have.attr('class', 'rail-player-content-sponsorship');
    });

    it('props.src is the tunic_campaign_url', () => {
      expect(campaignDisplay).to.have.attr('src', 'http://example.org/tunic-url');
    });

    it('preamble text reflects sponsorship', () => {
      expect(campaignDisplay).to.have.attr('preamble-text', 'Sponsored By');
    });

    it('has a name-only campaign', () => {
      expect(campaignDisplay).to.have.attr('name-only');
    });

    it('props.data-track-action is Sponsor', () => {
      expect(campaignDisplay).to.have.attr('data-track-action', 'Sponsor');
    });

    it('props.data-track-label is the tunic_campaign_url', () => {
      expect(campaignDisplay).to.have.attr('data-track-label', 'http://example.org/tunic-url');
    });

    it('placement is rail-player', () => {
      expect(campaignDisplay).to.have.attr('placement', 'rail-player');
    });
  });
});

