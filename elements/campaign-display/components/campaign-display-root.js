import React, { PropTypes, Component } from 'react';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';
import DfpPixel from './dfp-pixel';

class CampaignDisplayRoot extends Component {
  constructor(props) {
    super(props);
  }

  renderDefaultComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />
        <Logo {...this.props.campaign} />
        <Preamble text={this.props.preambleText}/>
        <SponsorName {...this.props.campaign} />
      </div>);
  }

  renderLogoComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />
        <Preamble text={this.props.preambleText}/>
        <Logo {...this.props.campaign} />
      </div>);
  }

  renderNameComponent() {
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />
        <Preamble text={this.props.preambleText}/>
        <SponsorName {...this.props.campaign} />
      </div>);
  }

  render() {
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
