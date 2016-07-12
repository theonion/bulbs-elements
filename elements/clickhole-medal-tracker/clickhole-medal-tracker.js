import BulbsElement from 'bulbs-elements/bulbs-element';
import Contenders from './components/contenders';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import { random, sortBy } from 'lodash';
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
    this.state = { contenders: [] };
    fetch(this.props.src)
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then(this.handleRequestSuccess.bind(this))
      .catch(this.handleRequestError);
  }

  componentDidMount () {
    setInterval(this.updateContenderStats.bind(this), 1000);
  }

  updateContenderStats () {
    this.setState({ contenders: sortedRandomizedContenders(this.state.contenders) });
  }

  handleRequestSuccess (contenders) {
    let sortedContenders = sortedRandomizedContenders(contenders);
    this.setState({ contenders: sortedContenders });
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
