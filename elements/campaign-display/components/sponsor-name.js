import React, { PropTypes, Component } from 'react';

export default class SponsorName extends Component {
  shouldWrapWithLink() {
    if (typeof this.props.noLink !== 'undefined') {
      return false;
    }
    return !!this.props.clickthrough_url;
  }

  render () {
    let name = <span>{this.props.name}</span>;
    let link = <a href={this.props.clickthrough_url}>{name}</a>;
    return <span className='campaign-display-sponsor-name'>{ this.shouldWrapWithLink() ? link : name }</span>;
  }
}

SponsorName.propTypes = {
  clickthrough_url: PropTypes.string,
  name: PropTypes.string.isRequired,
};
