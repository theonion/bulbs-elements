/* eslint react/prop-types: 0 */
import Contender from './contender';
import FlipMove from 'react-flip-move';
import Medal from './medal';
import React, { PropTypes, Component } from 'react';
import { requestInterval } from 'bulbs-elements/util';
import { shuffleContenders, topFiveContenders } from '../randomizer';
export default class Contenders extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    if (!this.props.disableAnimation) {
      this.scheduleContenderUpdates();
    }
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
        <FlipMove
          enterAnimation={this.props.enterAnimation}
          leaveAnimation={this.props.leaveAnimation}
          staggerDelayBy={this.props.staggerDelay}>
          {this.topContenderComponents()}
        </FlipMove>
      </div>);
  }
}

Object.assign(Contenders, {
  displayName: 'Contenders',
  defaultProps: {
    contenders: [],
  },
  propTypes: {
    contenders: PropTypes.array,
    disableAnimation: PropTypes.boolean,
    enterAnimation: PropTypes.string.isRequired,
    leaveAnimation: PropTypes.string.isRequired,
    staggerDelay: PropTypes.number.isRequired,
    updateInterval: PropTypes.number.isRequired,
  },
});
