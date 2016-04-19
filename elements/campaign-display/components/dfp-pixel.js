import React, { Component, PropTypes } from 'react';

export default class DfpPixel extends Component {

  componentDidMount () {
    let onRender = document.createEvent('Event');
    onRender.initEvent('campaign-display-dfp-pixel-ready', true, true);
    this.refs.container.dispatchEvent(onRender);
  }

  render () {
    let targeting = {
      dfp_placement: this.props.placement,
      dfp_campaign_id: this.props.campaignId,
    };

    return (
      <div
          ref="container"
          data-ad-unit="campaign-pixel"
          data-targeting={ JSON.stringify(targeting) }>
      </div>
    );
  }
}

DfpPixel.propTypes = {
  campaignId: PropTypes.number.isRequired,
  placement: PropTypes.string.isRequired,
};
