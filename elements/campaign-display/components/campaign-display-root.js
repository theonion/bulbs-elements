import React, { PropTypes, Component } from 'react';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';
import DfpPixel from './dfp-pixel';

class CampaignDisplayRoot extends Component {
  constructor(props) {
    super(props);
  }

  hasImageId() {
    return !!this.props.campaign.image_id;
  }

  hasSponsorName() {
    return !!this.props.campaign.name;
  }

  hasPreambleText() {
    return !!this.props.preambleText;
  }

  logoComponent() {
    return this.hasImageId() ? <Logo {...this.props.campaign} /> : '';
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
        <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />
        {this.preambleTextComponent()}
        {this.sponsorNameComponent()}
        {this.logoComponent()}
      </div>);
  }

  renderLogoComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />
        {this.preambleTextComponent()}
        {this.logoComponent()}
      </div>);
  }

  renderNameComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />
        {this.preambleTextComponent()}
        {this.sponsorNameComponent()}
      </div>);
  }

  renderEmptyComponent() {
    return <span/>;
  }

  hasCampaignData() {
    return !!(this.props.campaign && !this.props.campaign.detail);
  }

  render() {
    if (this.hasCampaignData()) {
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
};

CampaignDisplayRoot.propTypes = {
  campaign: PropTypes.object,
  logoOnly: PropTypes.bool,
  nameOnly: PropTypes.bool,
  placement: PropTypes.string,
  preambleText: PropTypes.string,
};

export default CampaignDisplayRoot;
