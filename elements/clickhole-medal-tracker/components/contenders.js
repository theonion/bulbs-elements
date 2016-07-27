/* eslint react/prop-types: 0 */
import Contender from './contender';
import FlipMove from 'react-flip-move';
import Medal from './medal';
import React, { PropTypes, Component } from 'react';
import { shuffleContenders, topFiveContenders } from '../randomizer';
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
    let top5 = topFiveContenders(this.props.contenders);
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
          <div className='left-column'>
            <div className='contender-name'>Country</div>
          </div>
          <div className='right-column'>
            <div className='gold-medal-totals'>
              <Medal color="#ead89d" />
            </div>
            <div className='silver-medal-totals'>
              <Medal color="#e1e1e1" />
            </div>
            <div className='bronze-medal-totals'>
              <Medal color="#d8b195" />
            </div>
            <div className='all-medal-totals'>Total</div>
          </div>
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
    updateInterval: 2000,
  },
  propTypes: {
    contenders: PropTypes.array,
    updateInterval: PropTypes.number,
  },
});
