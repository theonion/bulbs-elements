import React from 'react';
import { shallow } from 'enzyme';

import RailPlayerCampaign from './campaign';

describe('<rail-player> <RailPlayerCampaign>', () => {
  let subject;

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
    });

    it('renders a content sponsorship notice', () => {
      expect(subject).to.have.descendants('campaign-display');
    });

    it('sets the correct class', () => {
      expect(subject.find('campaign-display')).to.have.attr('class', 'rail-player-content-sponsorship');
    });

    it('props.src is the tunic_campaign_url', () => {
      expect(subject.find('campaign-display')).to.have.attr('src', 'http://example.org/tunic-url');
    });

    it('preamble text reflects sponsorship', () => {
      expect(subject.find('campaign-display')).to.have.attr('preamble-text', 'Sponsored By');
    });

    it('placement is rail-player', () => {
      expect(subject.find('campaign-display')).to.have.attr('placement', 'rail-player');
    });
  });
});

