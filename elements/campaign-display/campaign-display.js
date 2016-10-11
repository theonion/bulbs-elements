import React, { PropTypes } from 'react';
import invariant from 'invariant';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register';

import './campaign-display.scss';

import CampaignField from './fields/campaign-field';
import CampaignRequest from './fields/campaign-request-field';
import CampaignDisplayRoot from './components/campaign-display-root';

class CampaignDisplay extends BulbsElement {
  constructor (props) {
    invariant(!!props.placement, 'campaign-display component requires a placement');
    super(props);
  }

  initialDispatch () {
    if (this.props.src) {
      this.store.actions.fetchCampaign(this.props.src);
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.src !== prevProps.src) {
      this.store.actions.handleFetchComplete(null);
      this.initialDispatch();
    }
  }

  render () {
    if (this.state.campaignRequest.networkError) {
      return <span/>;
    }

    let options = Object.assign({}, this.state, this.props, {
      nameOnly: typeof this.props.nameOnly === 'string',
      logoOnly: typeof this.props.logoOnly === 'string',
      noPixel: typeof this.props.noPixel === 'string',
      noLink: typeof this.props.noLink === 'string',
    });
    return (<CampaignDisplayRoot {...options} />);
  }
}

Object.assign(CampaignDisplay, {
  displayName: 'CampaignDisplay',
  schema: {
    campaign: CampaignField,
    campaignRequest: CampaignRequest,
  },
  propTypes: {
    logoOnly: PropTypes.string,
    nameOnly: PropTypes.string,
    noPixel: PropTypes.string,
    noLink: PropTypes.string,
    placement: PropTypes.string.isRequired,
    preambleText: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('campaign-display', CampaignDisplay);

export default CampaignDisplay;
export const displayPropType = CampaignDisplay.propTypes.display;
