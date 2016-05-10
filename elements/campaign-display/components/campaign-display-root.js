import React, { PropTypes, Component } from 'react';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';
import DfpPixel from './dfp-pixel';

class CampaignDisplayRoot extends Component {
  constructor(props) {
    super(props);
  }

  hasId() {
    return typeof this.props.campaign.id === 'number';
  }

  hasImageUrl() {
    return !!this.props.campaign.image_url;
  }

  hasSponsorName() {
    return !!this.props.campaign.name;
  }

  hasPreambleText() {
    return !!this.props.preambleText;
  }

  pixelComponent() {
    return this.hasId() ? <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} /> : '';
  }

  logoComponent() {
    if (this.hasImageUrl()) {
      return <Logo {...this.props.campaign} />;
    }
    else {
      return this.props.logoOnly ? this.sponsorNameComponent() : '';
    }
  }

  sponsorNameComponent() {
    return this.hasSponsorName() ? <SponsorName {...this.props.campaign} /> : '';
  }

  preambleTextComponent() {
    return this.hasPreambleText() ? <Preamble text={this.props.preambleText}/> : '';
  }

  defaultComponents() {
    return [
      this.pixelComponent(),
      this.logoComponent(),
      this.preambleTextComponent(),
      this.sponsorNameComponent(),
    ];
  }

  logoOnlyComponents() {
    return [
      this.pixelComponent(),
      this.preambleTextComponent(),
      this.logoComponent(),
    ];
  }

  nameOnlyComponents() {
    return [
      this.pixelComponent(),
      this.preambleTextComponent(),
      this.sponsorNameComponent(),
    ];
  }

  renderEmptyComponent() {
    return <span/>;
  }

  hasActiveCampaign() {
    return !!(this.props.campaign && this.props.campaign.id && this.props.campaign.active);
  }

  hasSponsorInfo() {
    return this.hasSponsorName() || this.hasImageUrl();
  }

  isRenderable() {
    return this.hasActiveCampaign() && this.hasSponsorInfo() && this.hasPreambleText();
  }

  childComponents() {
    if (this.props.logoOnly) { return this.logoOnlyComponents(); }
    if (this.props.nameOnly) { return this.nameOnlyComponents(); }
    return this.defaultComponents();
  }

  wrapChildren(children) {
    if (!this.isRenderable()) { return ''; }
    if (this.props.noLink) { return children; }
    return (
      <a href={this.props.campaign.clickthrough_url}>
        {children}
      </a>
    );
  }

  render() {
    let children = this.childComponents();

    if (this.isRenderable()) {
      return (
        <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
          <div className='inner'>
            {this.wrapChildren(children)}
          </div>
        </div>
      );
    }
    else {
      return this.renderEmptyComponent();
    }
  }
}

CampaignDisplayRoot.defaultProps = {
  logoOnly: false,
  nameOnly: false,
  noLink: false,
};

CampaignDisplayRoot.propTypes = {
  campaign: PropTypes.shape({
    active: PropTypes.bool,
    clickthrough_url: PropTypes.string,
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  logoCrop: PropTypes.string,
  logoOnly: PropTypes.bool,
  nameOnly: PropTypes.bool,
  noLink: PropTypes.bool,
  placement: PropTypes.string,
  preambleText: PropTypes.string,
};

export default CampaignDisplayRoot;
