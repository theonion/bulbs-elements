import BulbsElement from 'bulbs-elements/bulbs-element';
import Contenders from './components/contenders';
import invariant from 'invariant';
import { isString } from 'lodash';
import React, { PropTypes } from 'react';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import { registerReactElement } from 'bulbs-elements/register';
import { sortedRandomizedContenders } from './randomizer';
import './clickhole-medal-tracker.scss';

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

  handleRequestSuccess (contenders) {
    this.setState({ contenders: sortedRandomizedContenders(contenders) });
  }

  handleRequestError () {
    console.log('error');
  }

  render () {
    return (
      <div className='clickhole-medal-tracker'>
        <Contenders contenders={this.state.contenders} disableAnimation={isString(this.props.disableAnimation)} />
      </div>);
  }
}

Object.assign(ClickholeMedalTracker, {
  displayName: 'ClickholeMedalTracker',
  propTypes: {
    disableAnimation: PropTypes.boolean,
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('clickhole-medal-tracker', ClickholeMedalTracker);

export default ClickholeMedalTracker;
export const displayPropType = ClickholeMedalTracker.propTypes.display;
