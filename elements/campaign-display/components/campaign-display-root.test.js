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

  describe('hasCampaignData', function() {
    it('returns false when there is no campaign data', () => {
      delete props.campaign;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasCampaignData()).to.equal(false);
    });

    it('returns true when there is campaign data', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasCampaignData()).to.equal(true);
    });

    it('returns false when the campaign is not found', () => {
      props.campaign = { detail: 'Not found.' };
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasCampaignData()).to.equal(false);
    });
  });

  context('with a clickthrough url, image and name', () => {
    beforeEach(() => {
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
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

    it('only renders the preamble and the name', () => {
      expect(subject.props.children.length).to.equal(2);
      expect(subject.props.children[0].type).to.equal(Preamble);
      expect(subject.props.children[1].type).to.equal(Logo);
    });
  });

  context('with missing data', () => {
    beforeEach(() => {
      props = {
        campaign: { detail: 'Not found.' },
        logoOnly: true,
        preambleText,
      };
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('renders an empty span', () => {
      expect(subject.props.children).to.be.undefined;
      expect(subject.type).to.equal('span');
    });
  });
});
