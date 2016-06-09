import React, { PropTypes, Component } from 'react';
import createFragment from 'react-addons-create-fragment';
import Logo from './logo';
import Preamble from './preamble';
import SponsorName from './sponsor-name';
import DfpPixel from './dfp-pixel';

class CampaignDisplayRoot extends Component {
  constructor (props) {
    super(props);
  }

  hasImageUrl () {
    return !!this.props.campaign.image_url;
  }

  hasValidCampaign() {
    return !!this.props.campaign;
  }

  pixelComponent () {
    return <DfpPixel campaignId={this.props.campaign.id} placement={this.props.placement} />;
  }

  logoComponent () {
    if (this.props.logoOnly && !this.hasImageUrl()) {
      return this.sponsorNameComponent();
    }
    return <Logo {...this.props.campaign} />;
  }

  sponsorNameComponent () {
    return <SponsorName {...this.props.campaign} />;
  }

  preambleTextComponent () {
    return <Preamble text={this.props.preambleText}/>;
  }

  defaultComponents () {
    return createFragment({
      dfpPixel: this.pixelComponent(),
      logo: this.logoComponent(),
      preamble: this.preambleTextComponent(),
      sponsorName: this.sponsorNameComponent(),
    });
  }

  logoOnlyComponents () {
    return createFragment({
      dfpPixel: this.pixelComponent(),
      preamble: this.preambleTextComponent(),
      logo: this.logoComponent(),
    });
  }

  nameOnlyComponents () {
    return createFragment({
      dfpPixel: this.pixelComponent(),
      preamble: this.preambleTextComponent(),
      sponsorName: this.sponsorNameComponent(),
    });
  }

  childComponents () {
    let children;
    if (this.props.logoOnly) {
      children = this.logoOnlyComponents();
    }
    else if (this.props.nameOnly) {
      children = this.nameOnlyComponents();
    }
    else {
      children = this.defaultComponents();
    }

    if (this.props.noLink) {
      return children;
    }

    return <a href={this.props.campaign.clickthrough_url}>{children}</a>;
  }

  render () {
    if (!this.hasValidCampaign()) { return <div className='inactive-campaign'></div>; }
    return (
      <div className='campaign-display' data-track-label={this.props.campaign.clickthrough_url}>
        <div className='inner'>
          {this.childComponents()}
        </div>
      </div>
    );
  }
}

CampaignDisplayRoot.defaultProps = {
  logoOnly: false,
  nameOnly: false,
  noLink: false,
};

CampaignDisplayRoot.propTypes = {
  campaign: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    clickthrough_url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  logoOnly: PropTypes.bool,
  nameOnly: PropTypes.bool,
  noLink: PropTypes.bool,
  placement: PropTypes.string.isRequired,
  preambleText: PropTypes.string.isRequired,
};

export default CampaignDisplayRoot;
