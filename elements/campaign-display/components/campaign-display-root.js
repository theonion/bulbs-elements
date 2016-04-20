import React, { PropTypes, Component } from 'react';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';

class CampaignDisplayRoot extends Component {
  constructor(props) {
    super(props);
  }

  renderDefaultComponent() {
    return (
      <div className='campaign-display'>
        <Logo {...this.props.campaign} />
        <Preamble text={this.props.preambleText}/>
        <SponsorName {...this.props.campaign} />
      </div>);
  }

  renderLogoComponent() {
    return (
      <div className='campaign-display'>
        <Preamble text={this.props.preambleText}/>
        <Logo {...this.props.campaign} />
      </div>);
  }

  renderNameComponent() {
    return (
      <div className='campaign-display'>
        <Preamble text={this.props.preambleText}/>
        <SponsorName {...this.props.campaign} />
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
  preambleText: PropTypes.string,
};

export default CampaignDisplayRoot;
