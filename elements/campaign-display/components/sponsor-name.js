import React, { PropTypes, Component } from 'react';

export default class SponsorName extends Component {

  render () {
    let hasUrl = !!this.props.clickthrough_url;
    let name = <span ref='name'>{this.props.name}</span>;
    let link = <a ref='linkWrapper' href={this.props.clickthrough_url}>{name}</a>;
    return <span className='campaign-display-sponsor-name'>{hasUrl ? link : name}</span>;
  }
}

SponsorName.propTypes = {
  clickthrough_url: PropTypes.string,
  name: PropTypes.string.isRequired,
};
