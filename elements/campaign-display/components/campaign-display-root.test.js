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
  let logoCrop;

  beforeEach(() => {
    logoCrop = '16x9';
    placement = 'top';
    preambleText = 'Presented by';
    campaign = {
      id: 123,
      image_url: 'http://example.com/img.jpg',
      clickthrough_url: 'http://example.com/campaign',
      name: 'Test Campaign',
      active: true,
    };
    props = {
      campaign,
      placement,
      preambleText,
    };
  });

  describe('hasId', () => {

    it('should return true when campaign has an id', () => {

      subject = new CampaignDisplayRoot(props);

      expect(subject.hasId()).to.be.true;
    });

    it('should return false when camapign id is not a number', () => {
      props.campaign.id = '1';

      subject = new CampaignDisplayRoot(props);

      expect(subject.hasId()).to.be.false;
    });

    it('should return false when campaign has no id', () => {
      delete props.campaign.id;

      subject = new CampaignDisplayRoot(props);

      expect(subject.hasId()).to.be.false;
    });
  });

  describe('hasImageUrl', () => {
    it('returns true when the campaign has an image_url', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasImageUrl()).to.equal(true);
    });

    it('returns false when the campaign has no image_url', () => {
      delete props.campaign.image_url;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasImageUrl()).to.equal(false);
    });
  });

  describe('hasSponsorName', () => {
    it('returns true when the campaign has a sponsor name', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasSponsorName()).to.equal(true);
    });

    it('returns false when the campaign has no sponsor name', () => {
      delete props.campaign.name;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasSponsorName()).to.equal(false);
    });
  });

  describe('hasSponsorInfo', () => {
    it('returns true with either a name or image_url present', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasSponsorInfo()).to.equal(true);
    });

    it('returns true when there is a name, and NO image_url', () => {
      delete props.campaign.image_url;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasSponsorInfo()).to.equal(true);
    });

    it('returns true when there is an image_url, and NO name', () => {
      delete props.campaign.name;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasSponsorInfo()).to.equal(true);
    });

    it('returns false when there is no image_url or name', () => {
      delete props.campaign.name;
      delete props.campaign.image_url;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasSponsorInfo()).to.equal(false);
    });
  });

  describe('isRenderable', function() {
    it('returns true when the campaign is active, has sponsor information, and preamble text', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.isRenderable()).to.equal(true);
    });

    it('returns false when the campaign is not active', () => {
      props.campaign.active = false;
      subject = new CampaignDisplayRoot(props);
      expect(subject.isRenderable()).to.equal(false);
    });

    it('returns false when there is no sponsor info', () => {
      delete props.campaign.name;
      delete props.campaign.image_url;
      subject = new CampaignDisplayRoot(props);
      expect(subject.isRenderable()).to.equal(false);
    });

    it('returns false when there is no preamble text provided', () => {
      delete props.preambleText;
      subject = new CampaignDisplayRoot(props);
      expect(subject.isRenderable()).to.equal(false);
    });
  });

  describe('hasPreambleText', () => {
    it('returns true when there is preamble text', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasPreambleText()).to.equal(true);
    });

    it('returns false when there is no preamble text', () => {
      delete props.preambleText;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasPreambleText()).to.equal(false);
    });
  });

  describe('pixelComponent', () => {

    it('should pass the campaign id to the pixel component', () => {

      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = shallowRenderer.getRenderOutput();
      expect(subject.props.children.props.children[0].props.campaignId)
        .to.equal(props.campaign.id);
    });

    it('should pass the placement to the pixel component', () => {

      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = shallowRenderer.getRenderOutput();

      expect(subject.props.children.props.children[0].props.placement).to.equal(props.placement);
    });

    it('should return an empty string when campaign has no id', () => {
      delete props.campaign.id;

      subject = new CampaignDisplayRoot(props);

      expect(subject.pixelComponent()).to.equal('');
    });
  });

  describe('logoComponent', () => {
    context('when the campaign has an image_url', () => {
      it('returns a Logo component', () => {
        subject = new CampaignDisplayRoot(props);
        expect(subject.logoComponent().type).to.equal(Logo);
      });
    });

    context('when the campaign has no image_url', () => {
      context('and logoOnly is true', () => {
        it('returns a SponsorName component', () => {
          delete props.campaign.image_url;
          props.logoOnly = true;
          subject = new CampaignDisplayRoot(props);
          expect(subject.logoComponent().type).to.equal(SponsorName);
        });
      });

      context('and logoOnly is false', () => {
        it('returns an empty string', function() {
          delete props.campaign.image_url;
          subject = new CampaignDisplayRoot(props);
          expect(subject.logoComponent()).to.equal('');
        });
      });
    });

    context('when noLink attribute is present', () => {
      it('passes the noLink attribute through to the component', () => {
        props.noLink = true;
        subject = new CampaignDisplayRoot(props);
        expect(subject.logoComponent().props.noLink).to.equal(true);
      });
    });
  });

  describe('sponsorNameComponent', () => {
    context('when the campaign has a name', () => {
      it('returns a SponsorName component', () => {
        subject = new CampaignDisplayRoot(props);
        expect(subject.sponsorNameComponent().type).to.equal(SponsorName);
      });
    });

    context('when the campaign has no name', () => {
      it('returns an empty string', () => {
        delete props.campaign.name;
        subject = new CampaignDisplayRoot(props);
        expect(subject.sponsorNameComponent()).to.equal('');
      });
    });

    context('when noLink attribute is present', () => {
      it('passes the noLink attribute through to the component', () => {
        props.noLink = true;
        subject = new CampaignDisplayRoot(props);
        expect(subject.sponsorNameComponent().props.noLink).to.equal(true);
      });
    });
  });

  describe('preambleTextComponent', () => {
    context('when there is preamble text', () => {
      it('returns a Preamble component', () => {
        subject = new CampaignDisplayRoot(props);
        expect(subject.preambleTextComponent().type).to.equal(Preamble);
      });
    });

    context('when there is no preamble text', () => {
      it('returns an empty string', () => {
        delete props.preambleText;
        subject = new CampaignDisplayRoot(props);
        expect(subject.preambleTextComponent()).to.equal('');
      });
    });
  });

  describe('hasActiveCampaign', () => {
    it('returns false when there is no campaign data', () => {
      delete props.campaign;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasActiveCampaign()).to.equal(false);
    });

    it('returns true when there is campaign data', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasActiveCampaign()).to.equal(true);
    });

    it('returns false when there is no campaign id', () => {
      delete props.campaign.id;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasActiveCampaign()).to.equal(false);
    });

    it('should return false when campaign is not active', () => {
      props.campaign.active = false;

      subject = new CampaignDisplayRoot(props);

      expect(subject.hasActiveCampaign()).to.be.false;
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
      expect(subject.props.children.props.children.length).to.equal(4);
      expect(subject.props.children.props.children[0].type).to.be.equal(DfpPixel);
      expect(subject.props.children.props.children[1].type).to.be.equal(Logo);
      expect(subject.props.children.props.children[2].type).to.be.equal(Preamble);
      expect(subject.props.children.props.children[3].type).to.be.equal(SponsorName);
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject.props['data-track-label']).to.equal(props.campaign.clickthrough_url);
    });

    context('with missing image_url', () => {
      beforeEach(() => {
        delete props.campaign.image_url;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('does not render the logo', () => {
        let types = subject.props.children.props.children.map((c) => c.type);
        expect(types).to.not.contain(Logo);
      });
    });

    context('with missing name', () => {
      beforeEach(() => {
        delete props.campaign.name;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('does not render the sponsor name', () => {
        let types = subject.props.children.props.children.map((c) => c.type);
        expect(types).to.not.contain(SponsorName);
      });
    });

    context('with missing preamble', () => {
      beforeEach(() => {
        delete props.preambleText;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('renders an empty component', () => {
        expect(subject.props.children).to.be.undefined;
      });
    });
  });

  context('with logo-only set to true', () => {
    beforeEach(() => {
      campaign = {
        id: 123,
        clickthrough_url: 'http://example.com/campaign',
        image_url: 'http://example.com/img.jpg',
        name: 'Test Campaign',
        active: true,
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
      expect(subject.props.children.props.children.length).to.equal(3);
      expect(subject.props.children.props.children[0].type).to.equal(DfpPixel);
      expect(subject.props.children.props.children[1].type).to.equal(Preamble);
      expect(subject.props.children.props.children[2].type).to.equal(Logo);
    });

    it('has a campaign-display class', () => {
      expect(subject.props.className).to.equal('campaign-display');
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject.props['data-track-label']).to.equal(props.campaign.clickthrough_url);
    });

    context('with missing image_url', () => {
      beforeEach(() => {
        delete props.campaign.image_url;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('does not render the logo', () => {
        let types = subject.props.children.props.children.map((c) => c.type);
        expect(types).to.not.contain(Logo);
      });

      it('renders the sponsor name', () => {
        let types = subject.props.children.props.children.map((c) => c.type);
        expect(types).to.contain(SponsorName);
      });
    });

    context('with missing preamble', () => {
      beforeEach(() => {
        delete props.preambleText;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('renders an empty component', () => {
        expect(subject.props.children).to.be.undefined;
      });
    });
  });

  context('with name-only set to true', () => {
    beforeEach(() => {
      campaign = {
        id: 123,
        clickthrough_url: 'http://example.com/campaign',
        image_url: 'http://example.com/img.jpg',
        active: true,
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
      expect(subject.props.children.props.children.length).to.equal(3);
      expect(subject.props.children.props.children[0].type).to.equal(DfpPixel);
      expect(subject.props.children.props.children[1].type).to.equal(Preamble);
      expect(subject.props.children.props.children[2].type).to.equal(Logo);
    });

    context('with missing name', () => {
      beforeEach(() => {
        delete props.campaign.name;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('does not render the sponsor name', () => {
        let types = subject.props.children.props.children.map((c) => c.type);
        expect(types).to.not.contain(SponsorName);
      });
    });

    context('with missing preamble', () => {
      beforeEach(() => {
        delete props.preambleText;
        shallowRenderer.render(<CampaignDisplayRoot {...props}/>);
        subject = shallowRenderer.getRenderOutput();
      });

      it('renders an empty component', () => {
        expect(subject.props.children).to.be.undefined;
      });
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

  context('with data active === false', () => {
    beforeEach(() => {
      props.campaign.active = false;
    });

    it('should render an empty span', () => {
      shallowRenderer.render(<CampaignDisplayRoot {...props} />);
      subject = shallowRenderer.getRenderOutput();

      expect(subject.props.children).to.be.undefined;
      expect(subject.type).to.equal('span');
    });
  });
});
