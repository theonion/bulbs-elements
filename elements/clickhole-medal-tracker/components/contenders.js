/* eslint react/prop-types: 0 */
import Contender from './contender';
import React, { PropTypes, Component } from 'react';
import { shuffleContenders, topFive, } from '../randomizer';
import FlipMove from 'react-flip-move';

export default class Contenders extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this.scheduleContenderUpdates();
  }

  scheduleContenderUpdates () {
    setInterval(this.updateContenderStats.bind(this), this.props.updateInterval);
  }

  topContenderComponents () {
    let top5 = topFive(this.props.contenders);
    return top5.map((contender) => <Contender {...contender} key={contender.name} />);
  }

  updateContenderStats () {
    shuffleContenders(this.props.contenders);
    this.forceUpdate();
  }

  render () {
    return (
      <div className='contenders'>
        <header>
          <div className='contender-name'>Country</div>
          <div className='gold-medal-totals'>G</div>
          <div className='silver-medal-totals'>S</div>
          <div className='bronze-medal-totals'>B</div>
          <div className='all-medal-totals'>Total</div>
        </header>
        <FlipMove enterAnimation="fade" leaveAnimation="fade" staggerDelayBy={50}>
          {this.topContenderComponents()}
        </FlipMove>
      </div>);
  }
}

Object.assign(Contenders, {
  displayName: 'Contenders',
  defaultProps: {
    contenders: [],
    updateInterval: 1500,
  },
  propTypes: {
    contenders: PropTypes.array,
    updateInterval: PropTypes.number,
  },
});
