import React, { PropTypes, Component } from 'react';

export default class SponsorName extends Component {
  render() {
    return <span className='campaign-display-sponsor-name'>{this.props.name}</span>;
  }
}

SponsorName.propTypes = {
  name: PropTypes.string.isRequired,
  noLink: PropTypes.bool,
};
