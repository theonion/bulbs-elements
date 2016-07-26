/* eslint react/prop-types: 0 */
import React, { Component, PropTypes } from 'react';

export default class Contender extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className='contender'>
        <div className='left-column'>
          <div className='contender-name'>
            <img className='contender-flag' src={this.props.flagImage} />
            {this.props.name}
          </div>
          <div className='contender-abbreviation'>{this.props.abbreviation}</div>
        </div>
        <div className='right-column'>
          <div className='gold-medal-totals'>{this.props.goldTotal}</div>
          <div className='silver-medal-totals'>{this.props.silverTotal}</div>
          <div className='bronze-medal-totals'>{this.props.bronzeTotal}</div>
          <div className='all-medal-totals'>{this.props.allTotal}</div>
        </div>
      </div>);
  }
}

Object.assign(Contender, {
  propTypes: {
    allTotal: PropTypes.number.isRequired,
    bronzeTotal: PropTypes.number.isRequired,
    flagImage: PropTypes.string.isRequired,
    goldTotal: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    silverTotal: PropTypes.number.isRequired,
  },
});
