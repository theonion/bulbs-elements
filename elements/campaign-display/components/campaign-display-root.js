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

  hasImageId() {
    return this.hasId() && !!this.props.campaign.image_id;
  }

  hasSponsorName() {
    return this.hasId() && !!this.props.campaign.name;
  }

  hasPreambleText() {
    return this.hasId() && !!this.props.preambleText;
  }

  pixelComponent() {
    return this.hasId() ? <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} /> : '';
  }

  logoComponent() {
    if (this.hasImageId()) {
      return <Logo {...this.props.campaign} crop={this.props.logoCrop} />;
    }
    else {
      return this.sponsorNameComponent();
    }
  }

  sponsorNameComponent() {
    return this.hasSponsorName() ? <SponsorName {...this.props.campaign} /> : '';
  }

  preambleTextComponent() {
    return this.hasPreambleText() ? <Preamble text={this.props.preambleText}/> : '';
  }

  renderDefaultComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        {this.pixelComponent()}
        {this.logoComponent()}
        {this.preambleTextComponent()}
        {this.sponsorNameComponent()}
      </div>);
  }

  renderLogoComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        {this.pixelComponent()}
        {this.preambleTextComponent()}
        {this.logoComponent()}
      </div>);
  }

  renderNameComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        {this.pixelComponent()}
        {this.preambleTextComponent()}
        {this.sponsorNameComponent()}
      </div>);
  }

  renderEmptyComponent() {
    return <span/>;
  }

  hasActiveCampaignData() {
    return !!(this.props.campaign && this.props.campaign.active);
  }

  render() {
    if (this.hasActiveCampaignData()) {
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
  logoCrop: 'original',
};

CampaignDisplayRoot.propTypes = {
  campaign: PropTypes.object,
  logoCrop: PropTypes.string,
  logoOnly: PropTypes.bool,
  nameOnly: PropTypes.bool,
  placement: PropTypes.string,
  preambleText: PropTypes.string,
};

export default CampaignDisplayRoot;
