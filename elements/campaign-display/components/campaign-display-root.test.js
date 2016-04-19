import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CampaignDisplayRoot from './campaign-display-root';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';

describe('<campaign-display> <CampaignDisplayRoot>', () => {
  let shallowRenderer = createRenderer();
  let subject;
  let props;
  let campaign;
  let preambleText;

  beforeEach(() => {
    preambleText = 'Presented by';
    campaign = {
      image_id: 1,
      clickthrough_url: 'http://example.com/campaign',
      name: 'Test Campaign',
    };
    props = {
      campaign,
      preambleText,
    };
  });

  context('with a clickthrough url, image and name', () => {
    beforeEach(() => {
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('renders the logo and name, each wrapped in a link to the clickthrough_url', () => {
      let logo = subject.props.children[0];
      let preamble = subject.props.children[1];
      let sponsorName = subject.props.children[2];

      expect(subject.props.children.length).to.equal(3);
      expect(logo.type).to.be.equal(Logo);
      expect(preamble.type).to.be.equal(Preamble);
      expect(sponsorName.type).to.be.equal(SponsorName);
    });

    it('has a data-label with the clickthrough_url', () => {
      expect(subject.props['data-label']).to.equal(props.campaign.clickthrough_url);
    });
  });

  context('with logo-only set to true', () => {
    beforeEach(() => {
      campaign = {
        clickthrough_url: 'http://example.com/campaign',
        image_id: 1,
      };
      props = {
        campaign,
        logoOnly: true,
        preambleText,
      };
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('only renders the preamble and the logo', () => {
      expect(subject.props.children.length).to.equal(2);
      expect(subject.props.children[0].type).to.equal(Preamble);
      expect(subject.props.children[1].type).to.equal(Logo);
    });

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('has a data-label with the clickthrough_url', () => {
      expect(subject.props['data-label']).to.equal(props.campaign.clickthrough_url);
    });
  });

  context('with name-only set to true', () => {
    beforeEach(() => {
      campaign = {
        clickthrough_url: 'http://example.com/campaign',
        image_id: 1,
      };
      props = {
        campaign,
        logoOnly: true,
        preambleText,
      };
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('has a data-label with the clickthrough_url', () => {
      expect(subject.props['data-label']).to.equal(props.campaign.clickthrough_url);
    });

    it('only renders the preamble and the name', () => {
      expect(subject.props.children.length).to.equal(2);
      expect(subject.props.children[0].type).to.equal(Preamble);
      expect(subject.props.children[1].type).to.equal(Logo);
    });
  });
});
