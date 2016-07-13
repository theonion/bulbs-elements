import BulbsElement from 'bulbs-elements/bulbs-element';
import Contenders from './components/contenders';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import { random, sortBy, merge, pullAt, deepClone } from 'lodash';
import { registerReactElement } from 'bulbs-elements/register';
import './clickhole-medal-tracker.scss';

function createRandomStats (contenders) {
  return contenders.map((contender) => {
    let goldTotal = random(1, 1000);
    let silverTotal = random(1, 1000);
    let bronzeTotal = random(1, 1000);
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

class ClickholeMedalTracker extends BulbsElement {
  constructor (props) {
    invariant(!!props.src, 'clickhole-medal-tracker component requires a src');
    super(props);
    this.updateInterval = 800;
    this.state = { contenders: [] };
    fetch(this.props.src)
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then(this.handleRequestSuccess.bind(this))
      .catch(this.handleRequestError);
  }

  scheduleContenderUpdates () {
    setInterval(this.updateContenderStats.bind(this), this.updateInterval);
  }

  selectNewContender () {
    let newContender;
    if (this.state.contenders.length) {
      let lastIndex = this.state.contenders.length - 1;
      newContender = this.state.contenders[random(5, lastIndex)];
    }

    return newContender;
  }

  top5 () {
    let top5;
    if (this.state.contenders.length) {
      top5 = this.state.contenders.slice(0, 5);
    }
    return top5;
  }

  selectRandomLeader () {
    let randomLeader;
    if (this.state.contenders.length) {
      randomLeader = this.state.contenders[random(0, 4)];
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

    this.swapContenders(this.state.contenders[leaderToReplaceIndex], this.selectNewContender());
    this.swapContenders(this.state.contenders[leaderToBumpDownIndex], this.state.contenders[leaderToBumpUpIndex]);
    this.setState({ contenders: sortByTotal(this.state.contenders) });
  }

  randomizeContenderStats (contenders) {
    let sortedContenders = sortedRandomizedContenders(contenders);
    this.setState({ contenders: sortedContenders });
  }

  handleRequestSuccess (contenders) {
    this.randomizeContenderStats(contenders);
    this.scheduleContenderUpdates();
  }

  render () {
    return (
      <div className='clickhole-medal-tracker'>
        <Contenders contenders={this.state.contenders} />
      </div>);
  }
}

Object.assign(ClickholeMedalTracker, {
  displayName: 'ClickholeMedalTracker',
  propTypes: {
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('clickhole-medal-tracker', ClickholeMedalTracker);

export default ClickholeMedalTracker;
export const displayPropType = ClickholeMedalTracker.propTypes.display;
