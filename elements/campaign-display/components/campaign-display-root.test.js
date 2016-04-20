import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CampaignDisplayRoot from './campaign-display-root';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';
import DfpPixel from './dfp-pixel';

describe('<campaign-display> <CampaignDisplayRoot>', () => {
  let shallowRenderer = createRenderer();
  let subject;
  let props;
  let campaign;
  let placement;
  let preambleText;

  beforeEach(() => {
    placement = 'top';
    preambleText = 'Presented by';
    campaign = {
      id: 123,
      image_id: 1,
      clickthrough_url: 'http://example.com/campaign',
      name: 'Test Campaign',
    };
    props = {
      campaign,
      placement,
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

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('renders the pixel, logo, and name, each wrapped in a link to the clickthrough_url', () => {
      expect(subject.props.children.length).to.equal(4);
      expect(subject.props.children[0].type).to.be.equal(DfpPixel);
      expect(subject.props.children[1].type).to.be.equal(Logo);
      expect(subject.props.children[2].type).to.be.equal(Preamble);
      expect(subject.props.children[3].type).to.be.equal(SponsorName);
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject.props['data-track-label']).to.equal(props.campaign.clickthrough_url);
    });
  });

  context('with logo-only set to true', () => {
    beforeEach(() => {
      campaign = {
        id: 123,
        clickthrough_url: 'http://example.com/campaign',
        image_id: 1,
      };
      props = {
        campaign,
        logoOnly: true,
        placement,
        preambleText,
      };
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('only renders the pixel, preamble and logo', () => {
      expect(subject.props.children.length).to.equal(3);
      expect(subject.props.children[0].type).to.equal(DfpPixel);
      expect(subject.props.children[1].type).to.equal(Preamble);
      expect(subject.props.children[2].type).to.equal(Logo);
    });

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject.props['data-track-label']).to.equal(props.campaign.clickthrough_url);
    });
  });

  context('with name-only set to true', () => {
    beforeEach(() => {
      campaign = {
        id: 123,
        clickthrough_url: 'http://example.com/campaign',
        image_id: 1,
      };
      props = {
        campaign,
        logoOnly: true,
        placement,
        preambleText,
      };
      shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
      subject = shallowRenderer.getRenderOutput();
    });

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject.props['data-track-label']).to.equal(props.campaign.clickthrough_url);
    });

    it('only renders the pixel, preamble, and name', () => {
      expect(subject.props.children.length).to.equal(3);
      expect(subject.props.children[0].type).to.equal(DfpPixel);
      expect(subject.props.children[1].type).to.equal(Preamble);
      expect(subject.props.children[2].type).to.equal(Logo);
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
