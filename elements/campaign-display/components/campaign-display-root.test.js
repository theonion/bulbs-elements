import React from 'react';
import { shallow } from 'enzyme';
import CampaignDisplayRoot from './campaign-display-root';
import DfpPixel from './dfp-pixel';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';

describe('<campaign-display> <CampaignDisplayRoot>', () => {
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

  describe('hasValidCampaign', () => {
    it('returns false when there is no campaign', function () {
      delete props.campaign;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasValidCampaign()).to.equal(false);
    });

    it('returns true when the campaign is not active', function () {
      props.campaign.active = false;
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasValidCampaign()).to.equal(true);
    });

    it('returns true when there is an active campaign', function () {
      subject = new CampaignDisplayRoot(props);
      expect(subject.hasValidCampaign()).to.equal(true);
    });
  });

  describe('pixelComponent', () => {
    it('passes the campaign id to the pixel component', () => {
      subject = shallow(<CampaignDisplayRoot {...props} />);
      expect(subject.find(DfpPixel)).to.have.prop('campaignId', props.campaign.id);
    });

    it('passes the placement to the pixel component', () => {
      subject = shallow(<CampaignDisplayRoot {...props} />);
      expect(subject.find(DfpPixel)).to.have.prop('placement', props.placement);
    });
  });

  describe('logoComponent', () => {
    context('when the campaign has an image_url', () => {
      it('returns a Logo component', () => {
        subject = new CampaignDisplayRoot(props);
        expect(subject.logoComponent().type).to.equal(Logo);
      });
    });
  });

  describe('sponsorNameComponent', () => {
    it('returns a SponsorName component', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.sponsorNameComponent().type).to.equal(SponsorName);
    });
  });

  describe('preambleTextComponent', () => {
    it('returns a Preamble component', () => {
      subject = new CampaignDisplayRoot(props);
      expect(subject.preambleTextComponent().type).to.equal(Preamble);
    });
  });

  context('when rendered', () => {
    beforeEach(() => {
      subject = shallow(<CampaignDisplayRoot {...props}/>);
    });

    it('has a campaign-display class', () => {
      expect(subject).to.have.className('campaign-display');
    });

    it('renders the pixel, logo, and name', () => {
      expect(subject).to.have.descendants(DfpPixel);
      expect(subject).to.have.descendants(Logo);
      expect(subject).to.have.descendants(Preamble);
      expect(subject).to.have.descendants(SponsorName);
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject).to.have.prop('data-track-label', props.campaign.clickthrough_url);
    });

    it('wraps the components in a link to the clickthrough_url', function () {
      expect(subject.equals(
        <div className='campaign-display' data-track-label={campaign.clickthrough_url}>
          <div className='inner'>
            <a href={campaign.clickthrough_url}>
              <DfpPixel campaignId={campaign.id} placement={props.placement} />
              <Logo {...campaign} />
              <Preamble text={props.preambleText}/>
              <SponsorName {...campaign} />
            </a>
          </div>
        </div>
      )).to.be.true;
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
      subject = shallow(<CampaignDisplayRoot {...props}/>);
    });

    it('only renders the pixel, preamble and logo', () => {
      expect(subject).to.have.descendants(DfpPixel);
      expect(subject).to.have.descendants(Logo);
      expect(subject).to.have.descendants(Preamble);
      expect(subject).to.not.have.descendants(SponsorName);
    });

    it('has a campaign-display class', () => {
      expect(subject).to.have.className('campaign-display');
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject).to.have.prop('data-track-label', props.campaign.clickthrough_url);
    });

    context('with missing image_url', () => {
      beforeEach(() => {
        delete props.campaign.image_url;
        subject = shallow(<CampaignDisplayRoot {...props}/>);
      });

      it('does not render the logo', () => {
        expect(subject).to.not.have.descendants('Logo');
      });

      it('renders the sponsor name', () => {
        expect(subject).to.have.descendants(SponsorName);
      });
    });
  });

  context('with name-only set to true', () => {
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
        nameOnly: true,
        placement,
        preambleText,
      };
      subject = shallow(<CampaignDisplayRoot {...props}/>);
    });

    it('has a campaign-display class', () => {
      expect(subject).to.have.className('campaign-display');
    });

    it('has a data-track-label with the clickthrough_url', () => {
      expect(subject).to.have.prop('data-track-label', props.campaign.clickthrough_url);
    });

    it('only renders the pixel, preamble, and name', () => {
      expect(subject).to.have.descendants(DfpPixel);
      expect(subject).to.have.descendants(Preamble);
      expect(subject).to.have.descendants(SponsorName);
      expect(subject).to.not.have.descendants(Logo);
    });
  });

  context('with inactive campaign', () => {
    it('renders a component', () => {
      props.campaign.active = false;
      subject = shallow(<CampaignDisplayRoot {...props} />);
      expect(subject).to.not.be.blank();
    });
  });

  context('with no-pixel set', () => {
    it('does not render a DFP Pixel', function() {
      props.noPixel = true;
      subject = shallow(<CampaignDisplayRoot {...props} />);
      expect(subject).not.to.have.descendants(DfpPixel);
    });
  });
});
