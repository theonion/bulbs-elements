/* eslint react/prop-types: 0 */
import Contender from './contender';
import React, { PropTypes, Component } from 'react';
import { take, random, sortBy, merge, pullAt, deepClone } from 'lodash';
import FlipMove from 'react-flip-move';

function createRandomStats (contenders) {
  return contenders.map((contender) => {
    let goldTotal = random(1, 300);
    let silverTotal = random(1, 300);
    let bronzeTotal = random(1, 300);
    let allTotal = goldTotal + silverTotal + bronzeTotal;

    return Object.assign(contender, {
      goldTotal,
      silverTotal,
      bronzeTotal,
      allTotal,
    });
  });
}

function sortByTotal (contenders) {
  return sortBy(contenders, (c) => -c.allTotal);
}

function sortedRandomizedContenders (contenders) {
  return sortByTotal(createRandomStats(contenders));
}

export default class Contenders extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.scheduleContenderUpdates();
  }

  scheduleContenderUpdates () {
    setInterval(this.updateContenderStats.bind(this), this.props.updateInterval);
  }

  topContenderComponents () {
    let newTopTen = take(sortedRandomizedContenders(this.props.contenders), 5);
    return newTopTen.map((contender) => <Contender {...contender} key={contender.name} />);
  }

  selectNewContender () {
    let newContender;
    if (this.props.contenders.length) {
      let lastIndex = this.props.contenders.length - 1;
      newContender = this.props.contenders[random(5, lastIndex)];
    }

    return newContender;
  }

  selectRandomLeader () {
    let randomLeader;
    if (this.props.contenders.length) {
      randomLeader = this.props.contenders[random(0, 4)];
    }

    return randomLeader;
  }

  swapContenders (contenderA, contenderB) {
    let newContenderAStats = this.createStatsFromTotal(contenderB.allTotal);
    let newContenderBStats = this.createStatsFromTotal(contenderA.allTotal);

    merge(contenderA, newContenderAStats);
    merge(contenderB, newContenderBStats);
  }

  createStatsFromTotal (total) {
    let adjustedTotal = total + random(13, 67);
    let newStats = [];
    let firstSlice = Math.floor(adjustedTotal * 0.33);
    let remainingTotal = adjustedTotal - firstSlice;
    let secondSlice = random(0, remainingTotal);
    let thirdSlice = remainingTotal - secondSlice;
    let allTotal = firstSlice + secondSlice + thirdSlice;

    newStats.push(firstSlice);
    newStats.push(secondSlice);
    newStats.push(thirdSlice);

    if (allTotal !== adjustedTotal) {
      let difference = adjustedTotal - allTotal;
      firstSlice += difference;
    }

    return {
      goldTotal: pullAt(newStats, random(0, 2))[0],
      silverTotal: pullAt(newStats, random(0, 1))[0],
      bronzeTotal: newStats[0],
      allTotal,
    };
  }

  updateContenderStats () {
    let leaderIndexes = [0, 1, 2, 3, 4];
    let leaderToReplaceIndex = pullAt(leaderIndexes, random(0, 4))[0];
    let leaderToBumpDownIndex = pullAt(leaderIndexes, random(0, 3))[0];
    let leaderToBumpUpIndex = pullAt(leaderIndexes, random(0, 2))[0];

    this.swapContenders(this.props.contenders[leaderToReplaceIndex], this.selectNewContender());
    this.swapContenders(this.props.contenders[leaderToBumpDownIndex], this.props.contenders[leaderToBumpUpIndex]);

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
        <FlipMove enterAnimation="fade" leaveAnimation="fade" staggerDelayBy={100}>
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
