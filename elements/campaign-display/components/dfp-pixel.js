import React, { Component, PropTypes } from 'react';

let findFunctionOnWindow = function (functionName) {
  let methodNameParts = functionName.split('.');
  let callback = methodNameParts.reduce((prev, curr) => prev[curr], window);

  if (typeof callback === 'function') {
    return callback;
  }

  throw new Error(`Unable to find \`window.${functionName}\``);
};

let functionPropType = function (props, propName, componentName) {
  try {
    findFunctionOnWindow(props[propName]);
  }
  catch (e) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
  }
};

export default class DfpPixel extends Component {

  componentDidMount () {
    findFunctionOnWindow(this.props.onRender)(this.refs.container);
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
  onRender: functionPropType,
  placement: PropTypes.string.isRequired,
};
