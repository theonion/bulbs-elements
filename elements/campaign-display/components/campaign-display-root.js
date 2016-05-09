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
      return <Logo {...this.props.campaign} noLink={this.props.noLink} />;
    }
    else {
      return this.props.logoOnly ? this.sponsorNameComponent() : '';
    }
  }

  sponsorNameComponent() {
    return this.hasSponsorName() ? <SponsorName {...this.props.campaign} noLink={this.props.noLink} /> : '';
  }

  preambleTextComponent() {
    return this.hasPreambleText() ? <Preamble text={this.props.preambleText}/> : '';
  }

  renderDefaultComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <div className='inner'>
          {this.pixelComponent()}
          {this.logoComponent()}
          {this.preambleTextComponent()}
          {this.sponsorNameComponent()}
        </div>
      </div>);
  }

  renderLogoComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <div className='inner'>
          {this.pixelComponent()}
          {this.preambleTextComponent()}
          {this.logoComponent()}
        </div>
      </div>);
  }

  renderNameComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <div className='inner'>
          {this.pixelComponent()}
          {this.preambleTextComponent()}
          {this.sponsorNameComponent()}
        </div>
      </div>);
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

  render() {
    if (this.isRenderable()) {
      if (this.props.logoOnly) {
        return this.renderLogoComponent();
      }
      else if (this.props.nameOnly) {
        return this.renderNameComponent();
      }
      else {
        return this.renderDefaultComponent();
      }
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
  campaign: PropTypes.object,
  logoCrop: PropTypes.string,
  logoOnly: PropTypes.bool,
  nameOnly: PropTypes.bool,
  noLink: PropTypes.bool,
  placement: PropTypes.string,
  preambleText: PropTypes.string,
};

export default CampaignDisplayRoot;
