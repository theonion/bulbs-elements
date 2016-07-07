import React from 'react';
import { shallow } from 'enzyme';

import VideoMetaCampaign from './campaign';

describe('<bulbs-video-meta> <VideoMetaCampaign>', () => {
  let props;
  let subject;
  let campaign;

  describe('render', () => {
    beforeEach(() => {
      props = {
        campaignTrackAction: 'action',
        campaignPlacement: 'placement',
        campaignPreamble: 'preamble',
        campaignUrl: '//example.org/campaign',
      };

      subject = shallow(<VideoMetaCampaign {...props}/>);
      campaign = subject.find('campaign-display');
    });

    it('renders a <campaign-display> element', () => {
      expect(campaign.length).to.eql(1);
    });

    it('passes <campaign-display> properties through', () => {
      expect(campaign).to.have.attr('data-track-action', 'action');
      expect(campaign).to.have.attr('placement', 'placement');
      expect(campaign).to.have.attr('preamble-text', 'preamble');
      expect(campaign).to.have.attr('src', '//example.org/campaign');
    });
  });
});
